import { Action } from '@ngrx/store';
import { CreditCardStateDetails } from '../models/card-details-state.model';

/**
 * Define the action types
 */
export const ADD_CARD_DETAILS = '[CARD DETAILS] Add';
/**
 * Function used for defining the action
 */
export class CardDetailsAction implements Action {
  readonly type = ADD_CARD_DETAILS;
  constructor(public payload: CreditCardStateDetails) {}
}
