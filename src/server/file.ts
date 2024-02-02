import { createInterface } from "node:readline";
import { createReadStream, createWriteStream } from "node:fs";

export function map(
  source: string,
  destination: string,
  mapping: (row: string, index: number) => string
): Promise<void> {
  let i: number = 0;

  const readline = createInterface(createReadStream(source, { encoding: "utf-8"}));
  const wstream = createWriteStream(destination, { encoding: "utf-8"});
  
  readline.on("line", line => {
    wstream.write(mapping(line, i++) + "\n");
  });

  return new Promise((resolve, reject) => {
    readline.on("close", resolve);
    readline.on("error", reject);
    wstream.on("error", reject);
  });
}

export function filter(
  source: string,
  destination: string,
  predicate: (line: string, index: number) => boolean
): Promise<void> {
  let i: number = 0;

  const readline = createInterface(createReadStream(source, { encoding: "utf-8"}));
  const wstream = createWriteStream(destination, { encoding: "utf-8"});

  readline.on("line", line => {
    predicate(line, i++) || wstream.write(line) + "\n";
  });

  return new Promise((resolve, reject) => {
    readline.on("close", resolve);
    readline.on("error", reject);
    wstream.on("error", reject);
  });
}

export function forEach(
  source: string,
  callback: (line: string, index: number) => void
): Promise<void> {
  let i: number = 0;
  const readline = createInterface(createReadStream(source, { encoding: "utf-8"}));
  readline.on("line", line => callback(line, i++));
  
  return new Promise((resolve, reject) => {
    readline.on("close", resolve);
    readline.on("error", reject);
  });
}

export function reduce<T>(
  source: string, 
  destination: string,
  base: T,
  reducer: (accumulated: T, line: string, index: number) => T
): Promise<T> {
  let i: number = 0;

  const readline = createInterface(createReadStream(source, { encoding: "utf-8"}));
  const wstream = createWriteStream(destination, { encoding: "utf-8"});

  readline.on("line", line => {
    base = reducer(base, line, i++);
  }); 

  return new Promise((resolve, reject) => {
    readline.on("close", () => {
      wstream.write(JSON.stringify(base, null, 2));
      resolve(base);
    })

    readline.on("error", reject);
  })
}