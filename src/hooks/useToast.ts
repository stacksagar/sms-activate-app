import { ToastOptions, toast as Toastify } from "react-toastify";

interface ToastProps extends ToastOptions {
  message: string;
  duration?: number;
}

export default function useToast() {
  return ({ message, duration, ...props }: ToastProps) =>
    Toastify(message, {
      position: props.position || "top-center",
      autoClose: props.autoClose || duration || 1500,
      closeOnClick: props.closeOnClick || true,
      pauseOnHover: props.pauseOnHover || true,
      draggable: props.draggable || true,
      ...props,
    });
}
