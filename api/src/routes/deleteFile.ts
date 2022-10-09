import { Request, Response } from "express";
import Files from "../db/Files.table";

export default async function(req: Request, res: Response) {
  try {
    const fileId = req.params.fileId;
    await Files.delete(fileId);
    res.sendStatus(204);
  } catch (err: any) {
    console.error(err);
    if (err.message?.match("400")) {
      res.status(400).json({ err: err.message });
    } else res.sendStatus(500);
  }
};
