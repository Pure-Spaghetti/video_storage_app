import { Request, Response } from "express";
import Files from "../db/Files.table";

export default async function(req: Request, res: Response) {
  try {
    const names = req.query.names;
    let files;
    if (names) {
      files = await Files.findForNames(names.toString().split(","));
    } else {
      files = await Files.findAll();
    }
    res.json({ files });
  } catch (err: any) {
    console.error(err);
    if (err.message?.match("400")) {
      res.status(400).json({ err: err.message });
    } else res.sendStatus(500);
  }
};
