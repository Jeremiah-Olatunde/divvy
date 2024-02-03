import * as file from "./file.js";

type Record = { [index: string]: string; }

export function map(
  source: string,
  destination: string,
  mapping: (record: Record, index: number) => Record
): Promise<void> {
  const headers: string[] = [];
  const record: Record = Object.create(null);

  return file.map(source, destination, (line, i) => {
    const row = line.split(",");

    if(i === 0){
      row.forEach(header => headers.push(header));
      return row.join(",");
    };

    row.forEach((colVal, i) => record[headers[i]] = colVal);

    const mapped = mapping(record, i - 1);
    return headers.map(header => mapped[header]).join(",");
  });
}

export function forEach(
  source: string,
  callback: (record: Record, index: number) => void
): Promise<void> {
  const headers: string[] = [];
  const record: Record = Object.create(null);

  return file.forEach(source, (line, i) => {
    const row = line.split(",");

    if(i === 0){
      row.forEach(header => headers.push(header));
      return row.join(",");
    };

    row.forEach((colVal, i) => record[headers[i]] = colVal);

    return callback(record, i - 1);
  });
}

export function filter(
  source: string,
  destination: string,
  predicate: (record: Record, index: number) =>  boolean,
): Promise<void> {
  const headers: string[] = [];
  const record: Record = Object.create(null);

  return file.filter(source, destination, (line, i) => {
    const row = line.split(",");

    if(i === 0){
      row.forEach(header => headers.push(header));
      return false;
    };
    
    row.forEach((colVal, i) => record[headers[i]] = colVal);
    
    return predicate(record, i - 1);
  });
}

export function fold<T>(
  source: string, 
  destination: string,
  base: T,
  reducer: (accumulated: T, record: Record, index: number) => T
): Promise<T> {
  const headers: string[] = [];
  const record: Record = Object.create(null);

  return file.fold(source, destination, base, (accum, line, i) => {
    const row = line.split(",");

    if(i === 0){
      row.forEach(header => headers.push(header));
      return accum;
    };

    row.forEach((colVal, i) => record[headers[i]] = colVal);

    return reducer(accum, record, i - 1);
  });
}

export async function align(
  source: string,
  destination: string
): Promise<void> {

  const width = await file.fold(source, null, [] as number[], (width, line, i) => {
    const row = line.split(",");
    return row.map((v, i) => width[i] = Math.max(width[i] ?? 0, v.length));
  });

  await file.map(source, destination, line => {
    const row = line.split(",");
    const padded = row.map((v, i) => v.padEnd(width[i]));
    return padded.join(",");
  });
}
