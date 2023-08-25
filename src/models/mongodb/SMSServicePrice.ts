import mdb from "@/lib/database/mongoDB";

const SMSServicePriceSchema = new mdb.Schema<SMSServicePrice>({
  service: { type: String },
  service_logo: { type: String },
  service_code: { type: String },
  country: { type: String },
  country_code: { type: String },
  api_cost: { type: Number },
  user_cost: { type: Number },
});

const SMSServicePrice = mdb.DefineModel<SMSServicePrice>(
  SMSServicePriceSchema,
  "SMSService"
);

export default SMSServicePrice;
