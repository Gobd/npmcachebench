# jsbench

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run 
```

This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
# npmcachebench

Using https://analytics.wikimedia.org/published/datasets/caching/2019/text/cache-t-00.gz for the benchmark from https://wikitech.wikimedia.org/wiki/Data_Platform/Data_Lake/Traffic/Caching

```
Loaded 9826681 values from file

Benchmarking neocache...

| Cache Size | Hit Rate | Avg Set Time (ns) | Avg Get Time (ns) |
|------------|----------|-------------------|-------------------|
| 5000       | 13.07  % | 197               | 110               |
| 25000      | 24.95  % | 130               | 138               |
| 100000     | 40.64  % | 115               | 204               |
| 250000     | 52.66  % | 90                | 340               |

Benchmarking s3-fifo-cache...

| Cache Size | Hit Rate | Avg Set Time (ns) | Avg Get Time (ns) |
|------------|----------|-------------------|-------------------|
| 5000       | 17.44  % | 147               | 127               |
| 25000      | 29.89  % | 184               | 145               |
| 100000     | 45.12  % | 180               | 287               |
| 250000     | 55.42  % | 148               | 301               |

Benchmarking lru-cache...

| Cache Size | Hit Rate | Avg Set Time (ns) | Avg Get Time (ns) |
|------------|----------|-------------------|-------------------|
| 5000       | 11.11  % | 172               | 110               |
| 25000      | 21.71  % | 132               | 125               |
| 100000     | 36.40  % | 207               | 177               |
| 250000     | 48.37  % | 180               | 247               |

Benchmarking quick-lru...

| Cache Size | Hit Rate | Avg Set Time (ns) | Avg Get Time (ns) |
|------------|----------|-------------------|-------------------|
| 5000       | 13.06  % | 132               | 110               |
| 25000      | 24.95  % | 111               | 136               |
| 100000     | 40.64  % | 101               | 252               |
| 250000     | 52.66  % | 81                | 331               |

Benchmarking tiny-lru...

| Cache Size | Hit Rate | Avg Set Time (ns) | Avg Get Time (ns) |
|------------|----------|-------------------|-------------------|
| 5000       | 11.11  % | 2999              | 212               |
| 25000      | 21.71  % | 220               | 145               |
| 100000     | 36.40  % | 179               | 186               |
| 250000     | 48.37  % | 209               | 253               |

Benchmarking mnemonist/lru-map...

| Cache Size | Hit Rate | Avg Set Time (ns) | Avg Get Time (ns) |
|------------|----------|-------------------|-------------------|
| 5000       | 11.11  % | 163               | 106               |
| 25000      | 21.71  % | 115               | 116               |
| 100000     | 36.40  % | 156               | 183               |
| 250000     | 48.37  % | 172               | 243               |

Benchmarking mnemonist/lru-cache...

| Cache Size | Hit Rate | Avg Set Time (ns) | Avg Get Time (ns) |
|------------|----------|-------------------|-------------------|
| 5000       | 11.11  % | 2913              | 191               |
| 25000      | 21.71  % | 172               | 135               |
| 100000     | 36.40  % | 205               | 172               |
| 250000     | 48.37  % | 251               | 223               |
```