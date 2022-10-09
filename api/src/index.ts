import express from 'express';
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

// app.use("/", express.static("../client/build/"));

app.post("/api/upload", upload.array("files"), uploadRoute);
app.get("/api/files", getFilesRoute);
app.put("/api/files/:fileId/add-to-folder/:folderId", putFileToFolderRoute);
app.get("/api/folders/:folderId/files", getFilesForFolderRoute);
app.post("/api/folders/new", jsonParser, newFolderRoute);
app.get("/api/folders", getFoldersRoute);
app.delete("/api/files/:fileId", deleteFileRoute);
app.delete("/api/folders/:folderId", deleteFolderRoute);

app.get('/ping', (req, res) => {
  res.send("pong")
});


const port = 3030;
app.listen(port, () => {
  console.log("Api listening on port", port);
});