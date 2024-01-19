import { parse } from  "csv-parse";
import { stringify } from "csv-stringify";
import { read } from "node:fs";
import { readdir, readFile, appendFile } from "node:fs/promises";
import { resolve } from "node:path";

// function promisify(f){
//   return function wrapper(...args){
//     return new Promise((resolve, reject) => {
//       f.call(this, ...args, (error, results) => {
//         error ? reject(error) : resolve(results)
//       });
//     })
//   }
// }

// const p = promisify(parse);

// const fileNames = (await readdir(resolve("./data")))
//                     .filter(fileName => fileName.endsWith(".csv"))
//                     .map(fileName => resolve("./data", fileName));


// const combined = [];



// const contents = await readFile(fileNames[4], { encoding: "utf-8" });

// const [headers, ...body] = await p(contents);
// // if(i === 0) combined.push(headers);
// combined.push(body);


// await appendFile(resolve("./data/divvy-tripdata.csv"), stringify(combined));

const parser = parse({ delimiter: ':'});

console.log(parser);