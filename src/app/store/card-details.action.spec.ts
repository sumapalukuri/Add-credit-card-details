import { CardDetailsAction, ADD_CARD_DETAILS } from './card-details.action';

describe('Card Details action', () => {
  it('should call add card details action', () => {
    const dataPayload = {
      cardNumber: '12345',
      cardHolder: 'sums',
      expiryDate: new Date(),
      securityCode: '',
      amount: 2389,
    };
    const action = new CardDetailsAction(dataPayload);
    expect({...action}).toEqual({type: ADD_CARD_DETAILS, payload: dataPayload});
  });
});
