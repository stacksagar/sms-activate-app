import mdb from "@/lib/database/mongoDB";

const ActivationSchema = new mdb.Schema<ActivationT>(
  {
    user: {
      type: mdb.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      default: "STATUS_WAIT_CODE",
    },

    activationId: { type: String },
    activationTime: { type: String },
    activationOperator: { type: String },
    activationCost: { type: Number },
    total_cost: { type: Number },
    phoneNumber: { type: String },
    canGetAnotherSms: { type: String },
    countryCode: { type: String },
    serviceCode: { type: String },
    sms_code: { type: Array },
    sms_text: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Activation = mdb.DefineModel<ActivationT>(ActivationSchema, "Activation");
export default Activation;
