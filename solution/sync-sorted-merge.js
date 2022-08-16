"use strict";

const { head } = require("lodash");
const MinHeap = require("./minheap");

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  const heap = new MinHeap();
  let added = 0;
  let printed = 0;

  // drain min from each source
  logSources.forEach((source, index) => {
    heap.add({ source: index, log: source.pop() });
  });

  while (heap.getSize() > 0) {
    const { source, log } = heap.remove();
    printer.print(log);
    printed++;

    const replacement = logSources[source].pop();
    if (replacement) {
      heap.add({ source, log: replacement });
    }
  }

  // drain all into heap (drain to memory)
  // logSources.forEach((_, index) => {
  //   while (logSources[index].drained === false) {
  //     const log = logSources[index].pop();

  //     if (log) {
  //       heap.add({ source: index, log });
  //       added++;
  //     }
  //   }
  // });

  // print all heap
  // while (heap.getSize() > 0) {
  //   const { log } = heap.remove();
  //   printer.print(log);
  //   printed++;
  // }

  console.log({ added, printed });
  console.log({ size: heap.getSize() });

  console.log("sources report:");
  logSources.forEach((s, i) =>
    console.log(`source ${i} is drained ${s.drained}`)
  );

  printer.done();
  return console.log("Sync sort complete.");
};
