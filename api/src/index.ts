import express from 'express';
import fs from 'fs';
import path from 'path';
import { exec, spawn, ChildProcessWithoutNullStreams } from 'child_process';
import multer from 'multer';
import getFilesRoute from './routes/getFiles';
import uploadRoute from './routes/uploadFiles';
import getFilesForFolderRoute from './routes/getFilesForFolder';
import bodyParser from 'body-parser';
import newFolderRoute from './routes/newFolder';
import getFoldersRoute from './routes/getFolders';
import putFileToFolderRoute from './routes/putFileToFolder';
import deleteFileRoute from './routes/deleteFile';
import deleteFolderRoute from './routes/deleteFolder';

const app = express();
const upload = multer({ dest: "uploaded_files_temp" });
const jsonParser = bodyParser.json();
app.use("/", express.static("../client/build/"));

/**
 * API Routes
 */
app.post("/api/upload", upload.array("files"), uploadRoute);
app.get("/api/files", getFilesRoute);
app.put("/api/files/:fileId/add-to-folder/:folderId", putFileToFolderRoute);
app.get("/api/folders/:folderId/files", getFilesForFolderRoute);
app.post("/api/folders/new", jsonParser, newFolderRoute);
app.get("/api/folders", getFoldersRoute);
app.delete("/api/files/:fileId", deleteFileRoute);
app.delete("/api/folders/:folderId", deleteFolderRoute);
/**
 * TEST Route
 */
app.get('/ping', (req, res) => {
  res.send("pong");
});
/**
 * CLIENT routes (everything else)
 */
app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "client/build/index.html"));
});
/**
 * CLIENT change listener
 * After 5 seconds of no more changes being made the
 * react-scripts rebuild process will kick off
 */
if (process.env.ENV === 'dev') {
  function doBuild() {
    console.log("Changes detected in client");
    if (!!buildTimer) {
      console.log("Removing current rebuild timer");
      clearTimeout(buildTimer);
      buildTimer = null;
    }
    console.log("Setting new build timer");
    buildTimer = setTimeout(() => {
      if (!buildProcess) {
        buildProcess = spawn("npm", ["run", "build"], {
          cwd: path.resolve("..", "client/")
        });
        function log(data: any, isError: boolean = false) {
          const string = Buffer.from(data).toString('utf-8')
          if (isError) return process.stderr.write(string);
          process.stdout.write(string);
        }
        buildProcess.stdout.on("data", log);
        buildProcess.stderr.on("data", log);
        buildProcess.on("spawn", () => console.log("Rebuilding client..."));
        buildProcess.on("message", console.log);
        buildProcess.on("close", (code) => {
          console.log(!code ? "Build Successful" : "Build Failed");
          buildProcess = null;
        });
        buildProcess.on("error", (err) => console.log("Build Error:\n\n" + err));
      }
    }, 5000);
  }
  let buildTimer: NodeJS.Timer | null;
  let buildProcess: null | ChildProcessWithoutNullStreams = null;
  console.log("Attaching client listener");
  fs.watch("../client/src/", doBuild);
  fs.watch("../client/src/Components", doBuild);
}

const port = 3030;
app.listen(port, () => {
  console.log("Api listening on port", port);
});