"use client";
import MuiTable from "@/common/MaterialUi/MuiTable/MuiTable";
import useBoolean from "@/hooks/state/useBoolean";
import { fetchUsers } from "@/redux/features/users/requests";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import React, { useEffect } from "react";
import usersTableCells from "./usersTableCells";

export default function Users() {
  const { data: users, fetched } = useReduxSelector((state) => state.users);
  const dispatch = useReduxDispatch();
  const deleting = useBoolean();

  useEffect(() => {
    if (fetched) return;
    dispatch(fetchUsers(null));
  }, [dispatch, fetched]);

  function onMultipleDelete() {}

  return (
    <div>
      <MuiTable
        onDeleteMultiple={onMultipleDelete}
        tableCells={usersTableCells}
        rows={users}
        loading={!fetched}
        tableTitle="Users"
        deleting={deleting}
      />
    </div>
  );
}
