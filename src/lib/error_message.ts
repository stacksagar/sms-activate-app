export default function error_message(error: any) {
  const errorMessage =
    error?.response?.data?.message || typeof error?.response?.data === "string"
      ? error?.response?.data
      : "Something wrong, try letter!";
  return errorMessage;
}
