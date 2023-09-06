import FIcon from "@/common/FIcon";
import { useSetting } from "@/context/SettingProvider";
import { countryLogo } from "@/data/dynamic_logos";
import { useReduxSelector } from "@/redux/redux_store";
import Image from "next/image";

interface RenderProps {
  row: SMSServicePrice;
}

function Service({ row }: RenderProps) {
  const { services } = useReduxSelector((s) => s.services);

  return (
    <div className="flex items-center gap-1">
      <Image
        src={services[row?.service]?.logo || "/"}
        width={25}
        height={25}
        alt=""
      />
      <span>{services[row?.service]?.name}</span>
    </div>
  );
}

function Country({ row }: RenderProps) {
  const { countries } = useReduxSelector((s) => s.services);
  return (
    <div className="flex items-center gap-1">
      <Image
        src={countryLogo(row.country) || "/"}
        width={25}
        height={25}
        alt=""
      />
      <span>{countries[row?.country]?.eng}</span>
    </div>
  );
}

function UserCost({ row }: RenderProps) {
  const { setting } = useSetting();
  return (
    <div className="flex items-center gap-1">
      {setting?.public?.currency} {row.user_cost}
    </div>
  );
}

const pricingTableCells: MuiTableHeader<SMSServicePrice>[] = [
  {
    key: "service",
    RenderComponent: Service,
  },

  {
    key: "country",
    RenderComponent: Country,
  },

  {
    key: "api_cost",
    label: "API Price",
    startIcon: "₽ ",
  },
  {
    key: "user_cost",
    label: "Custom Price",
    RenderComponent: UserCost,
  },
];

export default pricingTableCells;
