type SMSService = {
  shortName: string;
  name: string;
  logo: string;
  favorite?: boolean;
};

type ServiceData = {
  country: number | string;
  count: number;
  price: number;
};

type Country = {
  id: number | string;
  rus: string;
  eng: string;
  chn: string;
  visible: number;
  retry: number;
  rent: number;
  multiService: number;
  logo?: string;
};

type Roles = "user" | "moderator" | "admin";

type ActivationStatus =
  | "STATUS_WAIT_CODE"
  | "WRONG_ACTIVATION_ID"
  | "STATUS_CANCEL"
  | "COMPLETED";
