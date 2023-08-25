import mongoose, { Model, Schema, model, models } from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
connectMongoDB();

type M<T> = T & {
  _doc: T;
};

function DefineModel<TYPE>(schema: Schema, name: string) {
  let modelSchema: Model<M<TYPE>>;
  if (models && models[name]) {
    modelSchema = models[name] as Model<M<TYPE>>;
  } else {
    modelSchema = model<M<TYPE>>(name, schema);
  }
  return modelSchema;
}

const mdb = { ...mongoose, DefineModel };

export default mdb;
