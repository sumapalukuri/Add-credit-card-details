import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CreditCardDetails } from '../models/card-details.model';
import { CardPaymentDetailsService } from '../services/card-payment-details.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { CardDetailsState } from '../store/cardDetailsState';
import { CardDetailsAction } from '../store/card-details.action';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { CreditCardStateDetails } from '../models/card-details-state.model';
@Component({
  selector: 'app-card-details-form',
  templateUrl: './card-details-form.component.html',
  styleUrls: ['./card-details-form.component.scss'],
  providers: [Location],
})
export class CardDetailsFormComponent implements OnInit, OnDestroy {
  cardDetailsForm: FormGroup;
  requiredDate: Date;
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(
    public cardPaymentDetailsService: CardPaymentDetailsService,
    public toastr: ToastrService,
    public store: Store<CardDetailsState>,
    public location: Location,
    public formBuilder: FormBuilder
  ) {}
  /**
   * Life cycle hook used to initialize the credit card details form
   */
  ngOnInit(): void {
    this.cardDetailsForm = this.formBuilder.group({
      cardNumber: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^[0-9\s]*$/))]),
      cardHolder: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/))]),
      expiryDate: new FormControl('', [
        Validators.required,
        this.validateEnrollStartDate.bind(this),
      ]),
      securityCode: new FormControl('', [Validators.pattern(new RegExp(/^[0-9]*$/))]),
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
    });
    this.cardPaymentDetailsService.setButtonValue(true);
    this.requiredDate = new Date();
    this.requiredDate.setDate(this.requiredDate.getDate() + 1);
  }
  /**
   * on click of submit, if the form is valid then redirecting to dashboard and making the post request
   * Also display toast notifications based on the response
   */
  onSubmit(): void {
    if (this.cardDetailsForm.valid) {
      const cardDetail = this.storeData(this.cardDetailsForm);
      const cardDetails: CreditCardDetails = {
        id: Math.floor(1000 + Math.random() * 900000),
        details: cardDetail
      };
      this.cardPaymentDetailsService
        .postCreditCardDetails(cardDetails)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (response) => {
            if (response) {
              this.toastr.success(
                'Successfully posted the credit card details',
                'Yay! Success',
                { positionClass: 'toast-top-center' }
              );
              this.store.dispatch(
                new CardDetailsAction(cardDetail)
              );
              this.cardPaymentDetailsService.setButtonValue(false);
              this.location.back();
            }
          },
          (err) => {
            this.toastr.error(
              'Oops!something went wrong. Please try again',
              'Err!',
              { positionClass: 'toast-top-center' }
            );
          }
        );
    }
  }
  /**
   * Function used for validating the Expiration Date
   * @param control : Expiry Date Form control
   */
  validateEnrollStartDate(control: FormControl): void {
    const enteredDate = new Date(control.value);
    enteredDate.setHours(0, 0, 0, 0);
    if (enteredDate < this.requiredDate) {
      this.cardDetailsForm.get('expiryDate').setErrors({ minDate: true });
    }
  }
  /**
   * Function used to return the input card details
   * @param cardDetailsForm : Input card details
   */
  storeData(cardDetailsForm: FormGroup): CreditCardStateDetails {
    const details = {
      cardNumber: cardDetailsForm.controls.cardNumber.value,
      cardHolder: cardDetailsForm.controls.cardHolder.value,
      expiryDate: cardDetailsForm.controls.expiryDate.value,
      securityCode: cardDetailsForm.controls.securityCode.value,
      amount: cardDetailsForm.controls.amount.value,
    };
    return details;
  }
  /**
   * Life-cycle hooks to unsubscribe all the subscriptions
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
