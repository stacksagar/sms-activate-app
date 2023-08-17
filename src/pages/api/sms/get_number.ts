import { smsActive } from "@/lib/sms-activate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get_number(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const number = await smsActive.getNumber(
      "fb",
      false,
      "22",
      "operator",
      "ref",
      false,
      false,
      false
    );
    res.status(200).json({ number });
  } catch (error: any) {
    console.error("Error fetching data:", error?.message);
    res.send(error);
  }
}
/*
     "number": {
        "id": "1668378636",
        "number": "919870736653"
    }

        "number": {
        "id": "1668425761",
        "number": "918123537792"
    }
    // 
     "activations": {
        "status": "success",
        "activeActivations": [
            {
                "activationId": "1668378636",
                "serviceCode": "fb",
                "phoneNumber": "919870736653",
                "activationCost": "10.00",
                "activationStatus": "4",
                "smsCode": null,
                "smsText": null,
                "activationTime": "2023-08-16 09:06:11",
                "discount": "0",
                "repeated": "0",
                "countryCode": "22",
                "countryName": "India",
                "canGetAnotherSms": "1"
            }
        ]
    }
*/
