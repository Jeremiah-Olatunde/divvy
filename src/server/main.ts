import express from "express";
import ViteExpress, { build } from "vite-express";

import * as csv from "./csv.js";
import { buildArr } from "./utils.js";

const app = express();

/**
 * GENERAL METRICS
 * total number of rides for each (month | year)
 * total ride durations for each (month | year)
*/

const data = "./src/server/dataset/primary.csv";

app.get("/trip-count-month", async function(_, res){
  const result = await csv.fold(
    data, 
    null, 
    { casual: buildArr(12, _ => 0), member: buildArr(12, _ => 0) },
    (p, record) => {
      const status = record["member_casual"] as "member" | "casual";
      const started = new Date(record["started_at"].split(" ").join("T"));
      const month = started.getMonth();
      p[status][month] += 1;
      return p;
    }
  );  

  res.json(JSON.stringify(result));
});


app.get("/trip-count-year", async function(_, res){
  const result = await csv.fold(data, null, { casual: [0], member: [0] }, (p, record) => {
    p[record["member_casual"] as "member" | "casual"][0] += 1;
    return p;
  });

  res.json(JSON.stringify(result));
});

app.get("/trip-duration-month", async function(_, res){
  const result = await csv.fold(
    data, 
    null, 
    { casual: buildArr(12, _ => 0), member: buildArr(12, _ => 0) },
    (p, record) => {
      const status = record["member_casual"] as "member" | "casual";

      const started = new Date(record["started_at"].split(" ").join("T"));
      const ended = new Date(record["ended_at"].split(" ").join("T"));
      const duration = ended.getTime() - started.getTime();

      const month = started.getMonth();
      p[status][month] += duration;

      return p;
    }
  );  

  res.json(JSON.stringify(result));
});

app.get("/trip-duration-year", async function(_, res){
  const result = await csv.fold(data, null, { casual: [0], member: [0] }, (p, record) => {
    const status = record["member_casual"] as "member" | "casual";

    const started = new Date(record["started_at"].split(" ").join("T"));
    const ended = new Date(record["ended_at"].split(" ").join("T"));
    const duration = ended.getTime() - started.getTime();

    p[status][0] += duration;
    return p;
  });

  res.json(JSON.stringify(result));
});


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
