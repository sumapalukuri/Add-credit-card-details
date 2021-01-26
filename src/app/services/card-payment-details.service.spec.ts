import { TestBed } from '@angular/core/testing';

import { CardPaymentDetailsService } from './card-payment-details.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
class MockService {
  post(): any {
    return '';
  }
}
describe('CardPaymentDetailsService', () => {
  let service: CardPaymentDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        CardPaymentDetailsService,
        {
          provide: HttpClient,
          useClass: MockService,
        },
      ],
    });
    service = TestBed.inject(CardPaymentDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call the post http request', () => {
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
    const httpClient = TestBed.get(HttpClient);
    const serviceCall = spyOn(httpClient, 'post').and.callThrough();
    service.postCreditCardDetails(fakeCardDetails);
    expect(serviceCall).toHaveBeenCalledTimes(1);
  });
  it('should call setButtonValue function', () => {
    service.setButtonValue(true);
  });
});
