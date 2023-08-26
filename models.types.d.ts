type ModelCommonAttributes = {
  _id: string;
  createdAt?: string;
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
    currency?: string;
    selected_country?: number | string;
    website_thumbnail?: string;
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

type ActivationPromise = { activation: ActivationT };
