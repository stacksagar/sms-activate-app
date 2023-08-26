import Res from "@/lib/server/Res";
import get_sms_service_price from "@/lib/sms-active/get_sms_service_price";
import Activation from "@/models/mongodb/Activation";
import SMSServicePrice from "@/models/mongodb/SMSServicePrice";
import User from "@/models/mongodb/User";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createActivation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user: user_id, serviceCode, countryCode } = req.body;
  if (!user_id || !serviceCode || !countryCode) throw new Error("requiredAll!");

  try {
    // :: check user
    const user = await User.findById(user_id);
    if (!user) throw new Error("Not found!");

    // :: check this service custom price is added or not
    const serviceCustomPrice = await SMSServicePrice.findOne({
      service: serviceCode,
      country: countryCode?.toString(),
    });

    if (serviceCustomPrice) {
      if (user.balance < serviceCustomPrice.user_cost)
        throw new Error("Insufficient balance!");
    } else {
      // :: check service API price
      const serviceApiPrice = await get_sms_service_price(
        serviceCode,
        countryCode
      );
      const api_cost = serviceApiPrice?.cost as number;
      if (user.balance < api_cost) throw new Error("Insufficient balance!");
    }

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
      console.log("orderData ", orderData);
      throw new Error(orderData || orderData?.data);
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
      user.balance = user.balance - Number(activationCost || "0");
    }
    await user.save();

    console.log("serviceCustomPrice ", serviceCustomPrice?._doc);

    // :: Save activation data to our database
    let activation = await Activation.create({
      user: user_id,
      activationId,
      activationTime,
      activationOperator,
      activationCost,
      total_cost: serviceCustomPrice?.user_cost || activationCost,
      phoneNumber,
      canGetAnotherSms,
      countryCode,
      serviceCode,
      sms_code: [],
      sms_text: [],
      status: "STATUS_WAIT_CODE",
    });

    return { activation, message: "Congrats, Order created!" };
  } catch (error) {
    return Res.err(res, error);
  }
}
