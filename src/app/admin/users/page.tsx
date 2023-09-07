"use client";
import MuiTable from "@/common/MaterialUi/MuiTable/MuiTable";
import useBoolean from "@/hooks/state/useBoolean";
import { fetchUsers } from "@/redux/features/users/requests";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import React, { useEffect } from "react";
import usersTableCells from "./usersTableCells";
import toast_async from "@/lib/toast_async";
import axios from "axios";
import { userActions } from "@/redux/features/users/usersSlice";
import MuiBreadcrumbs from "@/common/MaterialUi/MuiBreadcrumbs";
import EditUserModal from "./EditUserModal";
import useString from "@/hooks/state/useString";

export default function Users() {
  const { data: users, fetched } = useReduxSelector((state) => state.users);
  const dispatch = useReduxDispatch();
  const deleting = useBoolean();
  const editModal = useBoolean();
  const editId = useString("");

  useEffect(() => {
    if (fetched) return;
    dispatch(fetchUsers(null));
  }, [dispatch, fetched]);

  async function onMultipleDelete(ids: ID[]) {
    deleting.setTrue();
    try {
      await toast_async<any>(axios.delete("/api/users", { data: { ids } }), {
        start: "Deleting.. wait a moment!",
        success: `Successfully deleted ${ids?.length} items!`,
        error: "",
      });
      dispatch(userActions.deleteByIds(ids));
    } finally {
      deleting.setFalse();
    }
  }

  return (
    <div>
      <MuiBreadcrumbs
        links={[
          {
            title: "Dashboard",
            icon: "home",
            href: "/admin",
          },

          {
            title: "Users",
            icon: "users",
            href: "/admin/users",
          },
        ]}
      />
      <br />

      <EditUserModal open={editModal} userId={editId.value} />

      <div className="max-w-full overflow-hidden">
        <MuiTable
          onRefreshData={() => dispatch(fetchUsers(null))}
          onDelete={onMultipleDelete}
          tableCells={usersTableCells}
          rows={users}
          loading={!fetched}
          tableTitle="Users"
          deleting={deleting}
          onEditButton={(id) => {
            editModal.setTrue();
            editId.setCustom(id);
          }}
        />
      </div>
    </div>
  );
}
