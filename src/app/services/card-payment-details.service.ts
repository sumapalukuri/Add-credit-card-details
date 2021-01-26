import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { CreditCardDetails } from '../models/card-details.model';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class CardPaymentDetailsService {
  public buttonEnable$ = new BehaviorSubject(false);
  public viewBeneficiarySubjectFlag = this.buttonEnable$.asObservable();
  /**
   * Base URL for the JSON-server(fake backend)
   */
  baseurl = environment.baseUrl;

  constructor(public http: HttpClient) {}
/**
 * Function used for posting the credit card details
 * @param creditCardDetails : Credit card details
 */
  public postCreditCardDetails(
    creditCardDetails: CreditCardDetails
  ): Observable<CreditCardDetails> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<CreditCardDetails>(
      `${this.baseurl}/details`,
      creditCardDetails,
      httpOptions
    );
  }
  setButtonValue(show: boolean): void {
    this.buttonEnable$.next(show);
  }
}
