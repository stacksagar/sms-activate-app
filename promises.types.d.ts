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
