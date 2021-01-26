import { CreditCardStateDetails } from '../models/card-details-state.model';
/**
 * Defining the credit card details state
 */
export interface CardDetailsState {
  readonly cardDetails: CreditCardStateDetails[];
}
