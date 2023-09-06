import mdb from "@/lib/database/mongoDB";

const SettingSchema = new mdb.Schema<SettingT>(
  {
    header: Object,
    footer: Object,
    seo: Object,
    public: Object,
    private: Object,
  },
  {
    timestamps: true,
  }
);

const Setting = mdb.DefineModel<SettingT>(SettingSchema, "Setting");

export default Setting;
