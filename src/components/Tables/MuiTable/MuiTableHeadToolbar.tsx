import { Toolbar, Typography, Tooltip } from "@mui/material";

import { alpha } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import MuiConfirmationDialog from "@/components/Modal/MuiConfirmationDialog";
import useBoolean, { UseBoolean } from "@/hooks/state/useBoolean";
import { useState, useEffect } from "react";
import useTracking from "@/hooks/useTracking";

interface Props {
  tableTitle: string;
  selected: ID[];
  onDeleteMultiple?: (id: ID[]) => void;
  deleting?: UseBoolean;
}

export default function MuiTableHeadToolbar(props: Props) {
  const { selected, tableTitle, onDeleteMultiple, deleting } = props;

  const showDeleteWarning = useBoolean();

  const tracking = useTracking();

  useEffect(() => {
    tracking.start(deleting?.true);
    tracking.finish(!deleting?.true);
  }, [tracking, deleting]);

  useEffect(() => {
    if (tracking.done) {
      showDeleteWarning.setFalse();
      tracking.reset();
    }
  }, [showDeleteWarning, tracking]);

  return (
    <>
      <MuiConfirmationDialog
        loading={deleting?.true}
        showModal={showDeleteWarning}
        warningText={`Want to delete all selected '${selected?.length}' items?`}
        onConfirm={() => onDeleteMultiple && onDeleteMultiple(selected)}
        confirmButtonText={`Delete (${selected.length}) items!`}
      />

      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {selected.length > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {tableTitle}
          </Typography>
        )}
        {selected.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={showDeleteWarning.setTrue}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </>
  );
}
