import ButtonWithCopy from "@/common/ButtonWithCopy";
import showDate from "@/lib/showDate";

const walletTableCells: MuiTableHeader<DepositT>[] = [
  {
    key: "createdAt",
    label: "Date",
    RenderComponent({ row }) {
      return (
        <div className="flex flex-col items-start">
          <span>{showDate(row.createdAt, true)}</span>
          <span> {new Date(row?.createdAt)?.toLocaleTimeString()} </span>
        </div>
      );
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

  {
    key: "txid",
    label: "TXID",
    RenderComponent({ row }) {
      return (
        <div className="flex items-center">
          <div className="max-w-[100px] overflow-hidden">
            <ButtonWithCopy value={row?.txid} showValue />
          </div>
          ...
        </div>
      );
    },
  },

  {
    key: "status",
  },

  {
    key: "actions",
    shouldHideDeleteButton() {
      return true;
    },
  },
];

export default walletTableCells;
