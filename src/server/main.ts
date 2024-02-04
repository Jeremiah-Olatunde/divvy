import express from "express";
import ViteExpress from "vite-express";

import * as csv from "./csv.js";

const app = express();

/**
 * GENERAL METRICS
 * total number of (members | casuals)
 * total number of rides for each (month | year)
 * total ride durations for each (month | year)
*/

const data = "./src/server/dataset/primary.csv";

app.get("/member-casual-count", async function(_, res){
 /**
  * return {
  *   member: [count],
  *   casual: [count],
  * }
 */
});

app.get("/trip-count-month", async function(_, res){
  /**
   * return {
   *  member: [janCount, ..., decCount],
   *  casual: [janCount, ..., decCount],
   * }
  */  
});


app.get("/trip-count-year", async function(_, res){
  /**
   * return {
   *  member: [count],
   *  casual: [count]
   * }
  */
});

app.get("/trip-duration-month", async function(_, res){
  /**
   * return {
   *  member: [count],
   *  casual: [count]
   * }
  */ 
});

app.get("/trip-duration-year", async function(_, res){
  /**
   * return {
   *  member: [count],
   *  casual: [count]
   * }
  */
});


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
