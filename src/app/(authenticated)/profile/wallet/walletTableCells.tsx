import ButtonWithCopy from "@/common/ButtonWithCopy";
import FIcon from "@/common/FIcon";
import unkown_person from "@/data/unkown_person";
import showDate from "@/lib/showDate";
import Image from "next/image";

const walletTableCells: MuiTableHeader<DepositT>[] = [
  {
    key: "createdAt",
    label: "Date",
    RenderComponent({ row }) {
      return <div>{showDate(row.createdAt, true)}</div>;
    },
  },

  {
    key: "amount",
    RenderComponent({ row }) {
      return (
        <div>
          {row?.currency} {row?.amount}
        </div>
      );
    },
  },
];

export default walletTableCells;
