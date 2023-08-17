import toast from "@/lib/toast";
import axios from "axios";
import error_message from "./error_message";

export default async function imageUpload(file: any, setLoading?: any) {
  if (!file) return;
  if (setLoading) {
    setLoading(true);
  }

  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await axios.post("upload/single", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    toast({
      message: error_message(error),
      type: "error",
    });
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
}
