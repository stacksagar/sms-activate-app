"use client";
import MuiTable from "@/common/MaterialUi/MuiTable/MuiTable";
import useBoolean from "@/hooks/state/useBoolean";
import { fetchUsers } from "@/redux/features/users/requests";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import React, { useEffect } from "react";
import usersTableCells from "./activationTableCells";
import { fetchActivations } from "@/redux/features/activations/requests";

export default function Users() {
  const dispatch = useReduxDispatch();
  const { data: activations } = useReduxSelector((s) => s.activations);
  const deleting = useBoolean();

  useEffect(() => {
    dispatch(fetchUsers(null));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchActivations({}));
  }, [dispatch]);

  function onMultipleDelete() {}

  return (
    <div>
      <MuiTable
        onDelete={onMultipleDelete}
        tableCells={usersTableCells}
        rows={activations}
        tableTitle="Activations"
        deleting={deleting}
      />
    </div>
  );
}
