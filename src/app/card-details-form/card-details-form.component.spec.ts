import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsFormComponent } from './card-details-form.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { CardPaymentDetailsService } from '../services/card-payment-details.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
const fakeCardDetails = {
  id: 1234,
  details: {
    cardNumber: '12345',
    cardHolder: 'sums',
    expiryDate: new Date(),
    securityCode: '',
    amount: 2389,
  },
};
class MockClass {
  setButtonValue(): any {
    return '';
  }
  postCreditCardDetails(): any {
    return '';
  }
  dispatch(): any {
    return '';
  }
  success(): any {
    return '';
  }
  error(): any {
    return '';
  }
}
describe('CardDetailsFormComponent', () => {
  let component: CardDetailsFormComponent;
  let fixture: ComponentFixture<CardDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDetailsFormComponent ],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([]),ToastrModule.forRoot()],
      providers: [
        {provide: ToastrService, useClass: MockClass},
        {provide: Store, useClass: MockClass},
        {provide: Location, useClass: MockClass},
        {provide: CardPaymentDetailsService, useClass: MockClass}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.cardDetailsForm = component.formBuilder.group({
      cardNumber: new FormControl('1234 1234 1234 1234'),
      cardHolder: new FormControl('Data'),
      expiryDate: new FormControl(new Date()),
      securityCode: new FormControl('890'),
      amount: new FormControl(890),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onSubmit function', () => {
    const httpService = TestBed.get(CardPaymentDetailsService);
    spyOn(httpService, 'postCreditCardDetails').and.returnValue(of(fakeCardDetails));
    const toastr = fixture.debugElement.injector.get(ToastrService);
    spyOn(toastr, 'success').and.callThrough();
    component.onSubmit();
  });
  it('should call validateEnrollStartDate function', () => {
    const date = new FormControl(new Date());
    component.validateEnrollStartDate(date);
  });
});
