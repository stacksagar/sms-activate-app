import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import ComponentTopLoader from '../../Loaders/ComponentTopLoader';
import { MuiButtonColor } from '../material-ui-types';
import { UseBoolean } from '../../../hooks/state/useBoolean';

interface Props {
  loading?: boolean;

  openModal: UseBoolean;

  closeModal?: boolean;
  closeText?: string;
  submitText?: string;
  closeColor?: MuiButtonColor;
  submitColor?: MuiButtonColor;
  title?: string;
  children?: React.ReactNode;
  handleSubmit?: (e: any) => void;
}

export default function MuiResponsiveDialog({
  loading,
  openModal,
  closeText,
  submitText,
  closeColor,
  submitColor,
  title,
  children,
  handleSubmit,
}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    openModal.toggle();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openModal?.true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      {/* Top Loader */}
      <ComponentTopLoader loading={loading} />

      {title ? <DialogTitle>{title}</DialogTitle> : null}

      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit && handleSubmit(e);
          }}
          className="relative md:min-w-[500px] py-2"
        >
          <div>{children}</div>
          <div className="flex justify-end gap-2 pt-5">
            <Button color={closeColor} onClick={handleClose} type="button">
              {closeText || 'Close'}
            </Button>
            <Button
              variant="contained"
              color={submitColor}
              className="flex items-center gap-2"
              type="submit"
            >
              <span> {submitText || 'Submit'} </span>
              {loading ? <CircularProgress color="inherit" size={18} /> : null}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
