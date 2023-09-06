import ButtonWithCopy from "@/common/ButtonWithCopy";
import FIcon from "@/common/FIcon";
import unkown_person from "@/data/unkown_person";
import { Button } from "@mui/material";
import Image from "next/image";

const usersTableCells: MuiTableHeader<UserT>[] = [
  {
    key: "name",
    label: "Name",
    RenderComponent({ row }) {
      return (
        <div className="flex items-center justify-between w-fit gap-4">
          <Image
            width={30}
            height={30}
            alt=""
            className="rounded"
            src={row?.image || unkown_person}
          />
          <span> {row?.name} </span>
        </div>
      );
    },
  },

  {
    key: "email",
    label: "Email/Phone",
    RenderComponent({ row }) {
      return (
        <div className="flex flex-col gap-0">
          <div className="flex items-center gap-1">
            <a href={`mailto:${row.email}`}>
              <FIcon icon="envelope" />
              <span> {row.email} </span>
            </a>
            <ButtonWithCopy value={row.email} size="small" />
          </div>
          {row?.phone ? (
            <div>
              <a href={`tel:${row.phone}`}>
                <FIcon icon="phone" />
                <span> {row.phone} </span>
              </a>
              <ButtonWithCopy value={row.phone} size="small" />
            </div>
          ) : null}
        </div>
      );
    },
  },

  {
    key: "role",
  },

  {
    key: "balance",
    startIcon: "৳ ",
  },

  {
    key: "actions",
    ActionButtons({ row }) {
      return (
        <>
          <Button variant="contained" size="small" color="secondary">
            Edit
          </Button>
          <Button variant="contained" size="small" color="warning">
            Ban User
          </Button>
        </>
      );
    },
  },
];

export default usersTableCells;
