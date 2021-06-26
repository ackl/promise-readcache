const Benchmark = require("benchmark");
const path = require("path");
const fs = require("fs/promises");

const readcache = require("../lib/readcache");

const suite = new Benchmark.Suite();

suite
  .add("readcache", {
    defer: true,
    fn: async function (promise) {
      await readcache(path.join(__dirname, "testfile.json"));
      promise.resolve();
    },
  })
  .add("readFile", {
    defer: true,
    fn: async function (promise) {
      await fs.readFile(path.join(__dirname, "testfile.json"));
      promise.resolve();
    },
  })
  .add("require", {
    defer: true,
    fn: function (promise) {
      require("./testfile.json");
      promise.resolve();
    },
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
