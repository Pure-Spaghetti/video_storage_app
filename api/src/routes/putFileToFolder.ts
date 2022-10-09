import { Request, Response } from "express";
import Files from "../db/Files.table";
import Folders from "../db/Folders.table";

export default async function(req: Request, res: Response) {
  try {
    const { fileId, folderId } = req.params;
    // check that folder exists
    const foldersRows = await Folders.find(folderId);
    if (!foldersRows.length) throw new Error(`400 no folder with id (${folderId}) exists`);
    // check that file exists
    const fileRows = await Files.find(fileId);
    if (!fileRows.length) throw new Error(`400 no file with id (${fileId}) exists`);
    await Files.addFileToFolder(fileId, folderId);
    res.sendStatus(201);
  } catch (err: any) {
    console.error(err);
    if (err.message?.match("400")) {
      res.status(400).json({ err: err.message });
    } else res.sendStatus(500);
  }
};
