import ButtonWithCopy from "@/common/ButtonWithCopy";
import FIcon from "@/common/FIcon";
import MuiModal from "@/common/MaterialUi/Modal/MuiModal";
import MuiButton from "@/common/MaterialUi/MuiButton";
import unkown_person from "@/data/unkown_person";
import useBoolean from "@/hooks/state/useBoolean";
import { Button } from "@mui/material";
import Image from "next/image";
import EditUserModal from "./EditUserModal";
import { useSetting } from "@/context/SettingProvider";
import MuiTableDeleteWarning from "@/common/MaterialUi/MuiTable/MuiTableDeleteWarning";
import MuiConfirmationDialog from "@/common/MaterialUi/Modal/MuiConfirmationDialog";
import axios from "axios";
import { useReduxDispatch } from "@/redux/redux_store";
import { userActions } from "@/redux/features/users/usersSlice";
import toast from "@/lib/toast";

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
    RenderComponent({ row }) {
      const { setting } = useSetting();
      return (
        <div>
          {setting?.public?.currency} {row.balance.toFixed(2)}
        </div>
      );
    },
  },

  {
    key: "actions",
    ActionButtons({ row }) {
      const dispatch = useReduxDispatch();
      const banning = useBoolean();
      const showBanWarning = useBoolean();
      async function banHandler() {
        try {
          const { data } = await axios.put<{ user: UserT }>(
            `/api/users?id=${row._id}`,
            { banned: row.banned ? false : true }
          );
          dispatch(userActions.updateUser(data.user));
          toast({
            message: `${row.name} has been ${
              row.banned ? "Un-banned" : "banned"
            }!`,
            type: "warning",
          });
        } finally {
          banning.setFalse();
          showBanWarning.setFalse();
        }
      }
      return (
        <>
          <MuiConfirmationDialog
            loading={banning?.true}
            showModal={showBanWarning}
            warningText={`Want to ${row.banned ? "unban" : "ban"} ${row.name}?`}
            onConfirm={banHandler}
            confirmButtonText={row.banned ? "Un-Ban User" : "Ban User"}
          />

          <Button
            onClick={showBanWarning.toggle}
            variant="contained"
            size="small"
            color="warning"
          >
            {row.banned ? "UnBan" : "Ban"}
          </Button>
        </>
      );
    },
  },
];

export default usersTableCells;
