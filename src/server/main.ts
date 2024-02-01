import express from "express";
import ViteExpress from "vite-express";

import { createReadStream } from "fs";
import { createInterface } from "readline";


const readline = createInterface(createReadStream("./src/server/dataset/random-dataset.csv"));
let line: string[] = [];


readline.on("line", data => {
  line = data.split(",");
  readline.pause();
})

const app = express();

app.get("/hello", (_, res) => {
  res.json(line);
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
