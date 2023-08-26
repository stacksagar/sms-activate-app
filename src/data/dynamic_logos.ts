export const countryLogo = (countryIDorCode?: string | number) =>
  `https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/country/${countryIDorCode}.svg`;

export const serviceLogo = (serviceCode?: string) =>
  `https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/${serviceCode}0.webp`;
