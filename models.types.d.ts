type ModelCommonAttributes = {
  _id: string;
  createdAt: string;
  updatedAt?: string;
};

type PromiseExtraAttributes = {
  messages?: string;
  error?: unknown;
};

interface UserT extends ModelCommonAttributes {
  name: string;
  email: string;
  balance: number;
  phone?: string;
  password: string;
  image?: string;
  role: Roles;
  banned?:boolean;
  favorite_services?: SMSService[];
}

interface SettingT extends ModelCommonAttributes {
  header?: {
    logo?: string;
    text_logo?: string;
  };

  seo?: {
    meta_keywords?: string;
    meta_description?: string;
  };

  footer?: {
    logo?: string;
    location?: string;
    copyright?: string;
  };

  public?: {
    site_title?: string;
    favicon?: string;
    email?: string;
    currency?: string;
    "1_usd_to_ruble": string;
    selected_country?: number | string;
    website_thumbnail?: string;
    telegram_phone?: string;
  };

  private?: {
    smtp_host?: string;
    smtp_port?: string;
    smtp_user?: string;
    smtp_password?: string;
    smtp_from?: string;
  };
}

interface SMSServicePrice extends ModelCommonAttributes {
  service: string;
  country: string;
  api_cost: number;
  user_cost: number;
}

interface ActivationT extends ModelCommonAttributes {
  user: UserT;
  activationId: string;
  activationTime?: string | Date;
  activationOperator?: string;
  activationCost: number;
  total_cost: number;
  phoneNumber: string;
  canGetAnotherSms?: boolean;
  status: ActivationStatus;
  countryCode: string;
  serviceCode: string;
  sms_code?: string[];
  sms_text?: string[];
}

type ActivationPromise = { activation: ActivationT; newBalance: number };

interface DepositT extends ModelCommonAttributes {
  user: UserT;

  amount: number;
  status: PaymentStatus;

  // Cryptomus
  uuid?: string;
  order_id?: string;
  payment_amount?: number | string;
  payment_amount_usd?: number | string;
  merchant_amount?: number | string;
  from: string;
  network: string;
  currency?: string;
  payer_currency?: string;
  txid?: string;

  additional_data?: {
    payable_amount: number | string;
    userId: string;
  };
}
