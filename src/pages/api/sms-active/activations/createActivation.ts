import Res from "@/lib/server/Res";
import Activation from "@/models/mongodb/Activation";
import SMSServicePrice from "@/models/mongodb/SMSServicePrice";
import User from "@/models/mongodb/User";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import getActiveActivations from "./getActiveActivations";
import ruble_to_usd from "@/lib/ruble_to_usd";

export default async function createActivation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user: user_id, serviceCode, countryCode } = req.body;
  if (!user_id || !serviceCode || !countryCode?.toString())
    throw new Error("requiredAll!");

  try {
    // :: check user
    const user = await User.findById(user_id);
    if (!user) throw new Error("Not found!");

    // :: check this service custom price is added or not
    const serviceCustomPrice = await SMSServicePrice.findOne({
      service: serviceCode,
      country: countryCode?.toString(),
    });

    // :: order number with API
    const { data: orderData } = await axios.request({
      method: "POST",
      url: "https://api.sms-activate.org/stubs/handler_api.php",
      params: {
        api_key: process.env.SMS_ACTIVE_API_KEY,
        action: "getNumberV2",
        service: serviceCode,
        country: countryCode,
        operator: "tmobile",
      },
    });

    // :: order creation check
    if (!orderData || typeof (orderData || orderData?.data) === "string") {
      throw new Error("Not available now, Try later!");
    }

    const {
      activationId,
      phoneNumber,
      activationCost,
      canGetAnotherSms,
      activationTime,
      activationOperator,
    } = orderData;

    if (!phoneNumber) throw new Error("Number not available!");

    // :: Let's calculate user balance and minus
    if (serviceCustomPrice) {
      user.balance = user.balance - serviceCustomPrice.user_cost;
    } else {
      const cost = ruble_to_usd(
        Number(activationCost || "0"),
        req.body?.usd_to_ruble_price
      );

      user.balance = user.balance - cost;
    }
    await user.save();

    // :: Save activation data to our database
    let activation = await Activation.create({
      user: user_id,
      activationId,
      activationTime,
      activationOperator,
      activationCost,
      total_cost:
        serviceCustomPrice?.user_cost ||
        ruble_to_usd(
          Number(activationCost || "0"),
          req.body?.usd_to_ruble_price
        ),

      phoneNumber,
      canGetAnotherSms,
      countryCode,
      serviceCode,
      sms_code: [],
      sms_text: [],
      status: "STATUS_WAIT_CODE",
    });

    let count = 0;
    let get_activations_interval = setInterval(() => {
      if (count === 40) return;
      count++;
      getActiveActivations(() => clearInterval(get_activations_interval));
      console.log("GetActiveActivations count=", count);
    }, 30000);

    return {
      activation,
      message: "Congrats, Order created!",
      newBalance: user.balance,
    };
  } catch (error: any) {
    return Res.msg(
      res,
      error?.message?.includes("status code")
        ? "Not available, try few minutes later"
        : error?.message,
      400
    );
  }
}
