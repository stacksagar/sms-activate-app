import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { UseBoolean } from "@/hooks/state/useBoolean";

interface Props {
  showModal: UseBoolean;
  warningText: string;

  loading?: boolean;
  onConfirm?: () => void;
  confirmButtonText?: string;
}

export default function MuiConfirmationDialog({
  showModal,
  warningText,

  loading,
  onConfirm,
  confirmButtonText,
}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    showModal.toggle();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={showModal?.true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      {/* Top Loader */}

      <DialogTitle className="flex items-center gap-2 border-b border-b-slate-300 dark:border-b-slate-600 text-center text-xl font-semibold">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          className="w-6"
          data-icon="triangle-exclamation"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
          ></path>
        </svg>
        <span>Confirmation</span>
      </DialogTitle>

      <DialogContent>
        <h3 className="p-4 text-center text-xl font-medium text-yellow-600">
          {warningText}
        </h3>
        <div className="relative md:min-w-[500px]">
          <div className="flex justify-end gap-2 pt-5">
            <Button onClick={handleClose} type="button">
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={onConfirm}
              variant="contained"
              className="flex items-center gap-2"
            >
              <span> {confirmButtonText || "Submit"} </span>
              {loading ? <CircularProgress color="inherit" size={18} /> : null}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
