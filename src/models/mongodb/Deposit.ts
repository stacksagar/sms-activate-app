import mdb from "@/lib/database/mongoDB";

const DepositSchema = new mdb.Schema<DepositT>(
  {
    user: {
      type: mdb.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    amount: Number,

    uuid: String,
    order_id: String,
    payment_amount: String,
    payment_amount_usd: String,
    merchant_amount: String,
    status: String,
    from: String,
    network: String,
    currency: String,
    payer_currency: String,
    txid: String,
  },
  {
    timestamps: true,
  }
);

const Deposit = mdb.DefineModel<DepositT>(DepositSchema, "Deposit");
export default Deposit;
