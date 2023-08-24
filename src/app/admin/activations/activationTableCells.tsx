import showDate from "@/lib/showDate";

const activationTableCells: MuiTableHeader<ActivationT>[] = [
  {
    key: "createdAt",
    label: "Date",
    RenderComponent({ row }) {
      return <div> {showDate(row?.createdAt)} </div>;
    },
  },
];

export default activationTableCells;
