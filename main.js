import Neocache from "neocache";
import fs from "fs/promises";
import path from "path";
import { LRUCache } from "lru-cache";
import { lru as tinylru } from "tiny-lru";
import QuickLRU from "quick-lru";
const mnLRUCache = require("mnemonist/lru-cache");
const mnLRUMap = require("mnemonist/lru-map");
import { S3FifoCache } from "s3-fifo-cache";

const caches = [
  {
    name: "neocache",
    cache: (maxSize) => {
      const c = new Neocache({ maxSize });
      return {
        get: c.getOnly.bind(c),
        set: c.set.bind(c),
      };
    },
  },
  {
    name: "s3-fifo-cache",
    cache: (maxSize) => {
      const c = new S3FifoCache(maxSize);
      return {
        get: c.get.bind(c),
        set: c.set.bind(c),
      };
    },
  },
  {
    name: "lru-cache",
    cache: (maxSize) => {
      const c = new LRUCache({ max: maxSize });
      return {
        get: c.get.bind(c),
        set: c.set.bind(c),
      };
    },
  },
  {
    name: "quick-lru",
    cache: (maxSize) => {
      const c = new QuickLRU({ maxSize });
      return {
        get: c.get.bind(c),
        set: c.set.bind(c),
      };
    },
  },
  {
    name: "tiny-lru",
    cache: (maxSize) => {
      const c = new tinylru(maxSize);
      return {
        get: c.get.bind(c),
        set: c.set.bind(c),
      };
    },
  },
  {
    name: "mnemonist/lru-map",
    cache: (maxSize) => {
      const c = new mnLRUMap(maxSize);
      return {
        get: c.get.bind(c),
        set: c.set.bind(c),
      };
    },
  },
  {
    name: "mnemonist/lru-cache",
    cache: (maxSize) => {
      const c = new mnLRUCache(maxSize);
      return {
        get: c.get.bind(c),
        set: c.set.bind(c),
      };
    },
  },
];

async function runBenchmark() {
  try {
    // Read the cache-t-00 file
    const fileContent = await fs.readFile(
      path.join(process.cwd(), "cache-t-00"),
      "utf-8"
    );
    const lines = fileContent.split("\n").filter((line) => line.trim());

    // Extract second column values to use as both key and value
    const values = lines
      .map((line) => {
        const columns = line.split("\t");
        return columns.length > 1 ? columns[1] : null;
      })
      .filter(Boolean);

    console.log(`Loaded ${values.length} values from file`);

    // Cache sizes to test
    const cacheSizes = [5000, 25000, 100000, 250000];

    for (const cache of caches) {
      console.log(`\nBenchmarking ${cache.name}...`);
      console.log(
        "\n| Cache Size | Hit Rate | Avg Set Time (ns) | Avg Get Time (ns) |"
      );
      console.log(
        "|------------|----------|-------------------|-------------------|"
      );
      for (const maxSize of cacheSizes) {
        Bun.gc(true);
        // Create a new cache with the current size
        const impl = cache.cache(maxSize);

        // Metrics
        let setTimeTotal = 0;
        let getTimeTotal = 0;
        let hits = 0;

        // First pass: Set values in cache and measure time
        for (const value of values) {
          const getStartTime = performance.now();
          const v = await impl.get(value);
          getTimeTotal += performance.now() - getStartTime;
          if (v) {
            if (v != value) {
              console.log(
                `cache error got ${v} expected ${value} from cache ${cache.name}`
              );
            }
            hits++;
          } else {
            const setStartTime = performance.now();
            await impl.set(value, value);
            setTimeTotal += performance.now() - setStartTime;
          }
        }

        // Calculate metrics
        const avgSetTime = setTimeTotal / values.length;
        const avgGetTime = getTimeTotal / values.length;
        const hitRate = (hits / values.length) * 100;

        // Report results
        console.log(
          `| ${maxSize.toString().padEnd(10)} | ${hitRate
            .toFixed(2)
            .padEnd(7)}% | ${(avgSetTime * 1000000).toFixed(0).padEnd(17)} | ${(
            avgGetTime * 1000000
          )
            .toFixed(0)
            .padEnd(17)} |`
        );
      }
    }
  } catch (error) {
    console.error("Benchmark error:", error);
  }
  process.exit(0);
}

runBenchmark();
