import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CreditCardStateDetails } from './models/card-details-state.model';
import { Store } from '@ngrx/store';
import { CardDetailsState } from './store/cardDetailsState';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { CardPaymentDetailsService } from './services/card-payment-details.service';

const CARD_DETAILS = 'cardDetails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'payments';
  clicked = false;
  cardDetails$: Observable<CreditCardStateDetails[]>;
  displayedColumns: string[] = [
    'cardNumber',
    'cardHolder',
    'expiryDate',
    'amount',
  ];
  dataSource: CreditCardStateDetails[];
  detailsData = new MatTableDataSource();
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(
    public store: Store<CardDetailsState>,
    public cardPaymentDetailsService: CardPaymentDetailsService,
    public cdRef: ChangeDetectorRef
  ) {
    this.cardDetails$ = store.select(CARD_DETAILS);
  }
  /**
   * Function used to get the card details from the store and display in the table
   */
  ngOnInit(): void {
    this.cardDetails$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((details) => {
        this.initializeData(details);
      });
  }
  /**
   * Function used to initialize the credit card details
   * @param creditCardStateDetails : Credit Card Details
   */
  initializeData(creditCardStateDetails: CreditCardStateDetails[]): void {
    this.detailsData = new MatTableDataSource<CreditCardStateDetails>(
      creditCardStateDetails
    );
    this.dataSource = this.detailsData.filteredData;
  }
  /**
   * Life Cycle hook used to get the button clicked or not
   */
  ngAfterViewInit(): void {
    this.cardPaymentDetailsService.buttonEnable$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.clicked = res;
      this.cdRef.detectChanges();
    });
  }
  /**
   * Life-cycle hooks to unsubscribe all the subscriptions
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
