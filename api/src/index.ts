import express, { Request, Response } from 'express';
import getFiles from './routes/getFiles';
import upload from './routes/upload';

const app = express();

app.post("/api/upload", upload);
app.get("/api/files", getFiles);

express.static("../client/build");

const port = 3030;
app.listen(port, () => {
  console.log("Api listening on port", port);
});