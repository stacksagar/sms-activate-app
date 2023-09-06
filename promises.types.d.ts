type ActiveActivation = {
  activationId?: string;
  serviceCode?: string;
  phoneNumber?: string;
  activationCost?: string;
  activationStatus?: string;
  smsCode: string[];
  smsText?: string[];
  activationTime?: string;
  discount?: string;
  repeated?: string;
  countryCode?: string;
  countryName?: string;
  canGetAnotherSms?: string;
};

type GetActiveActivations = {
  error?: string;
  status?: "success" | "error";
  activeActivations?: ActiveActivation[];
};

type PaymentStatus =
  | "paid"
  | "completed"
  | "paid_over"
  | "wrong_amount"
  | "process"
  | "confirm_check"
  | "wrong_amount_waiting"
  | "check"
  | "fail"
  | "cancel"
  | "system_fail"
  | "refund_process"
  | "refund_fail"
  | "refund_paid"
  | "locked";

type CryptoMusCreateInvoiceResponse = {
  state: number;
  result: {
    uuid: string;
    order_id: string;
    amount: string;
    payment_amount: string;
    payer_amount: string;
    discount_percent: number;
    discount: string;
    payer_currency: string;
    currency: string;
    comments?: any;
    merchant_amount: string;
    network: string;
    address: string;
    from?: string;
    txid?: string;
    payment_status: PaymentStatus;
    url: "https://pay.cryptomus.com/pay/e44b6da7-6a7e-49ed-bfc6-c404695a5779";
    expired_at: number;
    status: string;
    is_final: boolean;
    additional_data?: object | unknown;
    created_at: string;
    updated_at: string;
  };
};
