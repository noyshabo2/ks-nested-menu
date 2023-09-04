const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "root.json"
);

const getRoots = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Root {
  static getRoot(rootName, cb) {
    getRoots((roots) => {
      const root = roots[rootName];
      cb(root.id);
    });
  }
};
