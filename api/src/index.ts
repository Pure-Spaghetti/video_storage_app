import express, { Request, Response } from 'express';

const app = express();

app.get("/", async (req: Request, res: Response) => {
  res.send("Hola.");
})

express.static("../client/build");

const port = 3030;
app.listen(port, () => {
  console.log("Api listening on port", port);
});