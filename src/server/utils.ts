export function buildArr<T>(size: number, getItem: (i: number, xs: T[]) => T): T[] {
  const rtnArr: T[] = [];

  for(let i = 0; i < size; i++){
    rtnArr.push(getItem(i, rtnArr));
  }

  return rtnArr;
}