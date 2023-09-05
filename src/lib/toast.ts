import { ToastOptions, toast as Toastify } from "react-toastify";

interface Props extends ToastOptions {
  message: string;
  duration?: number;
}

export default function toast({ message, duration, ...props }: Props) {
  Toastify(
    typeof message === "string" ? message : "Something wrong, try letter!",
    {
      position: props.position || "top-center",
      autoClose: props.autoClose || duration || 1500,
      closeOnClick: props.closeOnClick || true,
      pauseOnHover: props.pauseOnHover || true,
      draggable: props.draggable || true,
      ...props,
    }
  );
}
