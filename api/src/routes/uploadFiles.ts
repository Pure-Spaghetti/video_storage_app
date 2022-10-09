import { Request, Response } from "express";
import Files from "../db/Files.table";

export default async function(req: Request, res: Response) {
  try {
    await Files.insert(req.files as Express.Multer.File[] ?? []);
    res.sendStatus(201);
  } catch (err: any) {
    console.error(err);
    if (err.message?.match("400")) {
      res.status(400).json({ err: err.message });
    } else res.sendStatus(500);
  }
};
