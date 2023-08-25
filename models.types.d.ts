type ModelCommonAttributes = {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
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

interface ActivationT extends ModelCommonAttributes {
  activationId: string;
  country_logo: string;
  service_logo: string;
  phoneNumber: string;
  time?: string | Date;
  cost: number;
  status: ActivationStatus;
  sms_code: string[];
  sms_text?: string[];
  canGetAnotherSms?: boolean;
  operator?: string;
  countryCode?: string;
  serviceCode?: string;
}

interface SettingT extends ModelCommonAttributes {
  header?: {
    logo?: string;
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
  service_logo: string;
  service_code: string;
  country: string;
  country_code: string;
  api_cost: number;
  user_cost: number;
}
