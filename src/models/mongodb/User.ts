import mdb from "@/lib/database/mongoDB";

const userSchema = new mdb.Schema<UserT>(
  {
    name: String,
    email: String,
    phone: String,
    password: String,
    image: String,
    favorite_services: Array,
    banned: Boolean,

    balance: { type: Number, default: 0 },
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
