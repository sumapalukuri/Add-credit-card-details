/**
 * Interface for credit card details for store
 */
export interface CreditCardStateDetails {
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: Date;
    securityCode?: string;
    amount?: number;
}
