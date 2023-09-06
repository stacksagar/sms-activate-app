import mdb from "@/lib/database/mongoDB";

const SMSServicePriceSchema = new mdb.Schema<SMSServicePrice>(
  {
    service: String,
    country: String,
    api_cost: Number,
    user_cost: Number,
  },
  {
    timestamps: true,
  }
);

const SMSServicePrice = mdb.DefineModel<SMSServicePrice>(
  SMSServicePriceSchema,
  "SMSServicePrice"
);

export default SMSServicePrice;
