import error_message from "@/lib/error_message";
import fs, { writeFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";

import { IncomingForm } from "formidable";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const method = req.method?.toUpperCase() as Methods;
    if (method !== "POST") return;

    const form = new IncomingForm();

    console.log("form ", form);

    form.parse(req, async (err, fields, files) => {
      if (err) throw new Error(err);

      const uploadedFile = files.file as any;
      const filePath = `path/to/save/${uploadedFile.name}`;
      await fs.copyFile(uploadedFile, filePath);

      console.log("uploadedFile ", uploadedFile);

      return res
        .status(200)
        .json({ message: "File uploaded and saved successfully" });
    });
  } catch (error) {
    res.status(400).json({
      message: error_message(error),
    });
  }
};

export default handler;
