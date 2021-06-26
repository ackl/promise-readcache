# promise-readcache

`promise-readcache` is a module to keep the contents of a file cached in memory until
it's modified. This is done by comparing the file's `fs.Stats.mtime`.

Originally meant to be used with JSON files, but anything else will do. It
will save you a bunch of `fs.readFile` until it's actually necessary, and
it's less "persistent" than loading JSON files using `require`.

## Installation

Using npm:

```
npm install promise-readcache
```

## Reference

### async promise-readcache (path, [options])

Returns a promise with the contents of the file at `path`.

If the file is not cached yet, or if the file has been modified since the time
it was cached, the file will be read and its contents cached. Otherwise, you
will get the cached contents.

```js
const readcache = require('promise-readcache');

let data;
data = await readcache('/path/to/file');
// The file is cached now, so this time the contents will be coming from 
// memory, instead of reading the file again
data = await readcache('/path/to/file');
```

__Arguments__

* `options` - Optional set of options passed to `fs.readFile`
    * `encoding` - The string encoding, defaults to `utf8`
    * `flag` - Defaults to `r`

## Benchmarking

Run the benchmark suite with `npm run benchmark`.

On Node.js v14.16.0, `promise-readcache` is ~2x require, whereas `fs.readFile` is about 10x.
```
readcache x 47,501 ops/sec ±0.59% (88 runs sampled)
readFile x 10,826 ops/sec ±1.38% (81 runs sampled)
require x 105,554 ops/sec ±33.38% (29 runs sampled)
Fastest is require
```


_Many node major versions were released since this fork_

_require has since clearly had an Agent Smith type upgrade_

On Node.js v5.0.0, `readcache` is slightly faster than `require` and `fs.readFile`.
```
Starting 'benchmark'...
    readcache x 667 ops/sec ±3.78% (81 runs sampled)
    readFile x 661 ops/sec ±1.06% (74 runs sampled)
    require x 579 ops/sec ±1.99% (36 runs sampled)
    Passed:
      'readcache' is etalon
      'readFile' at 1.01x slower
      'require' at 1.15x slower
Finished 'benchmark' after 18 s
```

On Node.js v4.2.1, `readcache` is slightly faster than `require` and `fs.readFile`.
```
Starting 'benchmark'...
    readcache x 738 ops/sec ±1.46% (84 runs sampled)
    readFile x 693 ops/sec ±1.76% (74 runs sampled)
    require x 711 ops/sec ±1.64% (77 runs sampled)
    Passed:
      'readcache' is etalon
      'require' at 1.04x slower
      'readFile' at 1.06x slower
Finished 'benchmark' after 19 s
```

On Node.js 0.12.7, `readcache` is faster than its `fs.readFile` counterpart,
but slower than `require`. 
```
Starting 'benchmark'...
    readcache x 690 ops/sec ±1.10% (80 runs sampled)
    readFile x 614 ops/sec ±1.15% (80 runs sampled)
    require x 714 ops/sec ±1.13% (47 runs sampled)
    Passed:
      'require' at 1.04x faster
      'readcache' is etalon
      'readFile' at 1.12x slower
Finished 'benchmark' after 18 s
```

On older Node.js versions like 0.10.28, `readcache` is even faster than 
`require`:
```
Starting 'benchmark'...
    readcache x 723 ops/sec ±1.93% (82 runs sampled)
    readFile x 645 ops/sec ±2.23% (84 runs sampled)
    require x 625 ops/sec ±3.03% (38 runs sampled)
    Passed:
      'readcache' is etalon
      'readFile' at 1.12x slower
      'require' at 1.16x slower
Finished 'benchmark' after 18 s
```

## License

The MIT License (MIT)

Copyright (c) 2021 Andrew Low

Copyright (c) 2015 Arturo Martínez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.