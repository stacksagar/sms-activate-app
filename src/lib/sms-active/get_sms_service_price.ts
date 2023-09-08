import axios from "axios";
import toast from "../toast";
import error_message from "../error_message";

type CostAndCount = {
  cost: number;
  count: number;
};

export default async function get_sms_service_price(
  service?: string,
  country?: string
) {
  try {
    let url = `sms-active/action/getPrices`;

    if (service && country) {
      url += `?service=${service}&country=${country}`;
    } else if (service && !country) {
      url += `?service=${service} `;
    } else if (country && !service) {
      url += `?country=${country} `;
    }

    const response = await axios.get(`/api/${url}`);

    const data = response?.data?.data as any;

    if (service && country) {
      return data[country][service] as CostAndCount;
    } else if (service && !country) {
      return data as {
        [country_ID: string]: {
          [service_shortName: string]: CostAndCount;
        };
      };
    } else if (country && !service) {
      return data[country] as {
        [service_shortName: string]: CostAndCount;
      };
    } else {
      return data as {
        [country_ID: string]: {
          [service_shortName: string]: CostAndCount;
        };
      };
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
}
