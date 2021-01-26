import { CreditCardStateDetails } from '../models/card-details-state.model';
import { CardDetailsAction, ADD_CARD_DETAILS } from './card-details.action';

const defaultState: CreditCardStateDetails[] = [];

/**
 * Function used to return the details based on the action given
 * @param state : To define the existing state
 * @param action : Action that needs to be performed
 */
export function cardDetailsReducer(
  state: CreditCardStateDetails[] = defaultState,
  action: CardDetailsAction
) {
  switch (action.type) {
    case ADD_CARD_DETAILS:
      return [...state, action.payload];
    default:
      return state;
  }
}
