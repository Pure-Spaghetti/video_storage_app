import express, { Request, Response, Router } from 'express';
import getFiles from './routes/getFiles';
import upload from './routes/upload';
import path from 'path';

const app = express();

app.use("/", express.static("../client/build/"));

// app.post("/api/upload", upload);
// app.get("/api/files", getFiles);

app.get('/ping', (req, res) => {
  res.send("pong")
});


const port = 3030;
app.listen(port, () => {
  console.log("Api listening on port", port);
});