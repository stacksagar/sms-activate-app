import mdb from "@/lib/database/mongoDB";

const SMSServicePriceSchema = new mdb.Schema<SMSServicePrice>(
  {
    service: { type: String },
    country: { type: String },
    api_cost: { type: Number },
    user_cost: { type: Number },
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
