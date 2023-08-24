import ButtonWithCopy from "@/common/ButtonWithCopy";
import FIcon from "@/common/FIcon";
import unkown_person from "@/data/unkown_person";
import Image from "next/image";

const pricingTableCells: MuiTableHeader<SMSServicePrice>[] = [
  {
    key: "service",
  },

  {
    key: "country",
  },
  {
    key: "api_cost",
  },
  {
    key: "user_cost",
    label: "YANsms Cost",
  },
];

export default pricingTableCells;
