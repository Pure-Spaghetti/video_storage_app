import { Request, Response } from "express";
import Folders from "../db/Folders.table";

export default async function(req: Request, res: Response) {
  try {
    const folderId = req.params.folderId;
    await Folders.delete(folderId);
    res.sendStatus(204);
  } catch (err: any) {
    console.error(err);
    if (err.message?.match("400")) {
      res.status(400).json({ err: err.message });
    } else res.sendStatus(500);
  }
};
