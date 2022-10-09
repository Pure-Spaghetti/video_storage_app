import { Request, Response } from "express";
import Folders from "../db/Folders.table";

export default async function(req: Request, res: Response) {
  try {
    if (!req.body.name) throw new Error("400 missing or invalid body param (name)");
    await Folders.insert(req.body.name);
    res.sendStatus(201);
  } catch (err: any) {
    console.error(err);
    if (err.message?.match("400")) {
      res.status(400).json({ err: err.message });
    } else res.sendStatus(500);
  }
};
