import { Request, Response } from "express";
import Folders from "../db/Folders.table";

export default async function(req: Request, res: Response) {
  try {
    const names = req.query.names;
    let folders;
    if (names) {
      folders = await Folders.findForNames(names.toString().split(","));
    } else {
      folders = await Folders.findAll();
    }
    res.json({ folders });
  } catch (err: any) {
    console.error(err);
    if (err.message?.match("400")) {
      res.status(400).json({ err: err.message });
    } else res.sendStatus(500);
  }
};
