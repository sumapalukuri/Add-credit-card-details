import { CreditCardStateDetails } from './card-details-state.model';
/**
 * Interface for card details for the service call
 */
export interface CreditCardDetails {
  id: number;
  details: CreditCardStateDetails;
}
