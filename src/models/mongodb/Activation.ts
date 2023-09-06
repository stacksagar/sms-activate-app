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

    activationId: String,
    activationTime: String,
    activationOperator: String,
    activationCost: Number,
    total_cost: Number,
    phoneNumber: String,
    canGetAnotherSms: String,
    countryCode: String,
    serviceCode: String,
    sms_code: Array,
    sms_text: Array,
  },
  {
    timestamps: true,
  }
);

const Activation = mdb.DefineModel<ActivationT>(ActivationSchema, "Activation");
export default Activation;
