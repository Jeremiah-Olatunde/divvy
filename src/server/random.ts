// import { copy } from "./copy.js";
// import { readdir } from "node:fs/promises";
// import { resolve } from "node:path";


// // TAKE A RANDOM SUBSET OF DATASET

// const HEADERS = "ride_id,rideable_type,started_at,ended_at,start_station_name,start_station_id,end_station_name,end_station_id,start_lat,start_lng,end_lat,end_lng,member_casual";


// (async function(){
//   const files: string[] = (await readdir(resolve("./data/output")))
//     .filter(file => file.endsWith("csv"))
//     .map(file => resolve("./data/output", file));


//   const linesWritten = await copy(
//     files.slice(0, 1), 
//     resolve("./data/output/random-subset-1.csv"),
//     [
//       (line, i) => {
//         if(i === 0) return false;
//         if(line === HEADERS) return true;
//         return Math.random() > 0.002823515593147215;
//       }
//     ]
//   );

//   console.log(linesWritten);
// })();


// export {}
