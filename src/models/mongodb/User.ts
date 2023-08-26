import mdb from "@/lib/database/mongoDB";

const userSchema = new mdb.Schema<UserT>(
  {
    balance: { type: Number, default: 0 },
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    password: { type: String },
    image: { type: String },
    role: {
      type: String,
      enum: ["user", "mode", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mdb.DefineModel<UserT>(userSchema, "User");

export default User;
