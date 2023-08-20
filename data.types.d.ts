type SMSService = {
  shortName: string;
  name: string;
  logo: string;
};

type ServiceData = {
  country: number | string;
  count: number;
  price: number;
};

type Country = {
  id: number;
  rus: string;
  eng: string;
  chn: string;
  visible: number;
  retry: number;
  rent: number;
  multiService: number;
};

type Roles = "user" | "moderator" | "admin";

type ActivationStatus =
  | "STATUS_WAIT_CODE"
  | "WRONG_ACTIVATION_ID"
  | "STATUS_CANCEL"
  | "COMPLETED";

type Activation = {
  id: number | string;
  activationId: string;
  country_logo: string;
  service_logo: string;
  phoneNumber: string;
  time?: string | Date;
  cost: number;
  status: ActivationStatus;
  sms_code: string[];
  sms_text?: string;
  canGetAnotherSms?: boolean;
  operator?: string;

  countryCode?: string;
  serviceCode?: string;
};
