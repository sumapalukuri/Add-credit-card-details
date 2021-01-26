import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, BehaviorSubject } from 'rxjs';
import { CardPaymentDetailsService } from './services/card-payment-details.service';
const cardDetails = [{
  cardNumber: '12345',
  cardHolder: 'sums',
  expiryDate: new Date(),
  securityCode: '',
  amount: 2389,
}]
class MockClass {
  public buttonEnable$ = new BehaviorSubject(false);
  public buttonData = this.buttonEnable$.asObservable();
  select(): any {
    return of(cardDetails);
  }
}
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: Store, useClass: MockClass},
        {provide: CardPaymentDetailsService, useClass: MockClass}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'payments'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('payments');
  });
  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.cardDetails$ = of(cardDetails);
    app.ngOnInit();
    expect(app.dataSource).toEqual(cardDetails);
  });
  it('should call initializeData', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngAfterViewInit();
    expect(app.clicked).toEqual(false);
  });
});
