

const { createInterface } = require("node:readline");
const { createReadStream, createWriteStream, write } = require('node:fs');

/**
 * copies lines from multiple source files into a destination file sequentially
 * 
 * @param {string[]} sources - An array of file names representing the source files
 * @param {string} destination - A file name of the destination file
 * @param {function(string, number): string|boolean}[] [compose] - (Optional) 
 *  An array of functions to compose line transformations.
 *  Each function should take a line and line number and return either a transformed line (string) or a boolean indicating whether to skip the line.
 * @returns {Promise<void>} - Resolves with number of lines written | Rejects with errors from the readable or writable streams if any
*/
export async function copy(
  sources: string[], 
  destination: string, 
  compose: ((line: string, lineNo: number) => string | boolean)[] = []
): Promise<number> {
  
  const wstream = createWriteStream(destination, { flags: "w"});
  let lineIdx = 0;

  for(const source of sources){
    const readline = createInterface({ input: createReadStream(source) });
    
    readline.on("line", (line: string) => {
      let accum = line;

      for(const f of compose){
        const result = f(accum, lineIdx);
        if(result === true) return;
        accum = result === false ? accum : result;
      }

      wstream.write(accum + "\n");
      lineIdx++;

    });

    await new Promise((resolve, reject) => {
      readline.on("close", resolve);
      readline.on("error", reject);
      wstream.on("error", reject);
    })

    readline.close();
  }

  wstream.end();
  return lineIdx;
}
