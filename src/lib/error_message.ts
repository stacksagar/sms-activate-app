export default function error_message(error: any) {
  const errorMessage =
    error?.response?.data?.message || typeof error?.response?.data === "string"
      ? error?.response?.data
      : error?.message || "Something wrong, try later!";
  return errorMessage;
}
