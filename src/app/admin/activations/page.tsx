"use client";
import MuiTable from "@/common/MaterialUi/MuiTable/MuiTable";
import useBoolean from "@/hooks/state/useBoolean";
import { fetchUsers } from "@/redux/features/users/requests";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import React, { useEffect } from "react";
import usersTableCells from "./activationTableCells";

export default function Users() {
  const dispatch = useReduxDispatch();
  const deleting = useBoolean();

  useEffect(() => {
    dispatch(fetchUsers(null));
  }, [dispatch]);

  function onMultipleDelete() {}

  return (
    <div>
      <MuiTable
        onDelete={onMultipleDelete}
        tableCells={usersTableCells}
        rows={[]}
        tableTitle="Activations"
        deleting={deleting}
        hideActions
      />
    </div>
  );
}
