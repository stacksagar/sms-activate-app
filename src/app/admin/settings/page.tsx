"use client";
import { useSetting } from "@/context/SettingProvider";
import SettingForm from "./SettingForm";
import MuiSearchSelect from "@/common/MaterialUi/Forms/MuiSearchSelect";
import { useEffect, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import { countryLogo } from "@/data/dynamic_logos";
import { fetchCountries } from "@/redux/features/services/requests";

export default function HeaderSetting() {
  const { setting } = useSetting();
  const { countries, countries_fetched } = useReduxSelector((s) => s.services);
  const dispatch = useReduxDispatch();
  const [searchCountries, setSearchCountries] = useState<Country[]>([]);

  const [selectedCountry, setSelectedCountry] = useState({} as Country);

  useEffect(() => {
    if (countries_fetched) return;
    dispatch(fetchCountries({}));
  }, [dispatch, countries_fetched]);

  useEffect(() => {
    const arrayCountries = Object.values(countries).map((c) => {
      const obj = {
        ...c,
        logo: countryLogo(c?.id),
        eng: c?.eng || `ID: ${c?.id}`,
      };
      if (setting?.public?.selected_country?.toString() == c?.id?.toString()) {
        setSelectedCountry(obj);
      }
      return obj;
    });
    setSearchCountries(arrayCountries);
  }, [countries, setting]);

  return (
    <SettingForm
      keyValue="public"
      fields={{
        site_title: {
          type: "text",
          value: setting?.public?.site_title,
        },

        currency: {
          type: "text",
          value: setting?.public?.currency,
        },

        "1_usd_to_ruble": {
          type: "text",
          value: setting?.public?.["1_usd_to_ruble"],
        },

        selected_country: {
          value: setting?.public?.selected_country as any,
          CustomComponent({ setValue, value }) {
            return (
              <div>
                <label className="text-orange-600 font-medium">
                  Selected Country
                </label>
                <MuiSearchSelect
                  label={"Select Country"}
                  defaultValue={selectedCountry}
                  options={searchCountries}
                  titleKey="eng"
                  onChange={(c) => {
                    setSelectedCountry(c);
                    setValue(c?.id);
                  }}
                  imageKey="logo"
                />
              </div>
            );
          },
        },

        email: {
          type: "text",
          value: setting?.public?.email,
        },

        telegram_phone: {
          type: "text",
          value: setting?.public?.telegram_phone,
        },
      }}
    />
  );
}
