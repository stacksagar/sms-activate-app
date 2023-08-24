import { ToastOptions, toast as Toastify } from "react-toastify";

interface Props extends ToastOptions {
  message: string;
  duration?: number;
}

export default function toast({ message, duration, ...props }: Props) {
  Toastify(message, {
    position: props.position || "top-center",
    autoClose: props.autoClose || duration || 1500,
    closeOnClick: props.closeOnClick || true,
    pauseOnHover: props.pauseOnHover || true,
    draggable: props.draggable || true,
    ...props,
  });
}
