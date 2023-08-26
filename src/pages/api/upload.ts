import { IncomingForm } from 'formidable';
import fs from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';

import Res from '@/lib/server/Res';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const method = req.method?.toUpperCase() as Methods;
    if (method !== "POST") return;

    const form = new IncomingForm();

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
    return Res.err(res, error);
  }
};

export default handler;
