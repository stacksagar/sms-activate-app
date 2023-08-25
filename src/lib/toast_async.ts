import { toast } from "react-toastify";

export default async function toast_async(
  func: Promise<{
    data?: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
  }>,

  messages?: { start?: string; success?: string; error?: string }
) {
  const response = await toast.promise(
    func,
    {
      pending: messages?.start || "Please wait a moment...",
      success: {
        render({ data }: any) {
          return messages?.success || data?.message || data?.data?.message;
        },
      },
      error: {
        render({ data }: any) {
          return messages?.error || data?.message || data?.data?.message;
        },
      },
    },
    {
      autoClose: 1000,
    }
  );

  return response;
}
