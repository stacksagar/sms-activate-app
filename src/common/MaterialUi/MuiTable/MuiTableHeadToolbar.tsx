import { Toolbar, Typography, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { alpha } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import useBoolean, { UseBoolean } from "@/hooks/state/useBoolean";
import FIcon from "@/common/FIcon";

interface Props {
  tableTitle: React.ReactNode | string;
  selected: ID[];
  showDeleteWarning?: UseBoolean;
  onRefreshData?: () => void;
  clearDeleteID?: () => void;
}

export default function MuiTableHeadToolbar(props: Props) {
  const {
    selected,
    tableTitle,
    showDeleteWarning,
    onRefreshData,
    clearDeleteID,
  } = props;

  const refreshig = useBoolean(false);
  async function handleOnRefresh() {
    if (!onRefreshData) return;
    refreshig.setTrue();
    await onRefreshData();
    refreshig.setFalse();
  }

  return (
    <>
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
          <div className="flex items-center gap-2 mr-auto">
            {onRefreshData ? (
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={handleOnRefresh}
              >
                <IconButton size="small">
                  {refreshig.true ? (
                    <FIcon icon="refresh" className="animate-spin" />
                  ) : (
                    <FIcon icon="refresh" />
                  )}
                </IconButton>
              </motion.div>
            ) : null}

            <div>{tableTitle}</div>
          </div>
        )}
        {selected.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                showDeleteWarning && showDeleteWarning.setTrue();
                clearDeleteID && clearDeleteID();
              }}
            >
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
