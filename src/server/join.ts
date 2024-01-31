// import { copy } from "./copy.js";
// import { readdir } from "node:fs/promises";
// import { resolve } from "node:path";


// // JOIN DATA FROM SEPERATE DATASETS INTO ONE DATASET

// const HEADERS = "ride_id,rideable_type,started_at,ended_at,start_station_name,start_station_id,end_station_name,end_station_id,start_lat,start_lng,end_lat,end_lng,member_casual";

// (async function(){

//   const files: string[] = (await readdir(resolve("./data/downloaded")))
//     .filter(file => file.endsWith("csv"))
//     .map(file => resolve("./data/downloaded", file));

//   copy(
//     files, 
//     resolve("./data/output/divvy-data.csv"),
//     [(line, i) => line === HEADERS && i !== 0] // ONLY KEEP THE FIRST HEADER LINE
//   );

// })();


// export {}