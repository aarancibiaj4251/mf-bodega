export interface PayPalToken {
  access_token: string;
  app_id: string;
  expires_in: number;
  nonce: string;
  scope: string;
  token_type: string;
}

export interface IdentityPayPalToken {
  client_token: string;
  expires_in: number;
}
