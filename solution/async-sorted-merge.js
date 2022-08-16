"use strict";

const { fromCallback } = require("bluebird");
const { add } = require("lodash");
const MinHeap = require("./minheap");

// Print all entries, across all of the *async* sources, in chronological order.
module.exports = (logSources, printer) => {
  const heap = new MinHeap();

  return new Promise(async (resolve, reject) => {
    const firstMin = await Promise.all(logSources.map((s) => s.popAsync()));
    firstMin.forEach((log, index) => heap.add({ source: index, log }));

    // ***********************************
    // Logs printed:            798
    // Time taken (s):          3.729
    // Logs/s:                  213.99839098954143
    // ***********************************
    // while (heap.getSize() > 0) {
    //   const { source, log } = heap.remove();
    //   printer.print(log);

    //   const replacement = await logSources[source].popAsync();
    //   if (replacement) {
    //     heap.add({ source, log: replacement });
    //   }
    // }

    // ***********************************
    // Logs printed:            672
    // Time taken (s):          4.485
    // Logs/s:                  149.83277591973243
    // ***********************************
    while (heap.getSize() > 0) {
      const { log } = heap.remove();
      printer.print(log);

      const replacements = await Promise.all(
        logSources.map((s) => s.popAsync())
      );

      replacements.forEach((log, index) => {
        if (log) heap.add({ source: index, log });
      });
    }

    console.log({ size: heap.getSize() });

    console.log("sources report:");
    logSources.forEach((s, i) =>
      console.log(`source ${i} is drained ${s.drained}`)
    );

    printer.done();
    resolve(console.log("Async sort complete."));
  });
};
