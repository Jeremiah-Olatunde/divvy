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
      row.forEach((header, j) => headers[j] = header);
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
      row.forEach((header, j) => headers[j] = header);
      return row.join(",");
    };

    row.forEach((colVal, i) => record[headers[i]] = colVal);

    return callback(record, i - 1);
  });
}