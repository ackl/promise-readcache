const fs = require("fs/promises");
const cache = {};

/**
 * Reads a text file and stores it in the cache.
 *
 * @param {string} path - Path to the file you want to read.
 * @param {object} [options] - Optional options object, passed to fs.readFile.
 * @param {string} [options.encoding=utf8] - The expected string encoding, will default to `utf8`.
 * @param {string} [options.flag] - The flag, will default to fs.readFile's
 */
module.exports = async function (path, options) {
  options = options || {};
  options.encoding = options.encoding || "utf8";

  try {
    const stats = await fs.stat(path);
    const cached = cache[path];

    if (cached && cached.mtime >= stats.mtime.getTime()) {
      return Promise.resolve(cached.data);
    }

    try {
      const data = fs.readFile(path, options);
      const mtime = stats.mtime.getTime();
      cache[path] = {
        data,
        mtime,
      };

      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
