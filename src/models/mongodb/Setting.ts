import mdb from "@/lib/database/mongoDB";

const SettingSchema = new mdb.Schema<SettingT>(
  {
    header: { type: Object },
    footer: { type: Object },
    seo: { type: Object },
    public: { type: Object },
    private: { type: Object },
  },
  {
    timestamps: true,
  }
);

const Setting = mdb.DefineModel<SettingT>(SettingSchema, "Setting");

export default Setting;
