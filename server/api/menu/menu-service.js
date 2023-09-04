const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Root = require("../root/root-service.js");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "menu.json"
);

const getMenuItems = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class MenuItem {
  constructor(label) {
    this.id = uuidv4();
    this.label = label;
    this.childrenIds = [];
  }

  create(parentId, cb) {
    getMenuItems((menuItems) => {
      menuItems[this.id] = this;
      menuItems[parentId].childrenIds.push(this.id);
      fs.writeFile(p, JSON.stringify(menuItems), (err) => {
        console.log(err);
      });
      cb(this);
    });
  }

  static getRoot(cb) {
    getMenuItems((menuItems) => {
      Root.getRoot("root", (rootId) => {
        const root = menuItems[rootId];
        cb(root);
      });
    });
  }

  static getChildren(id, cb) {
    getMenuItems((menuItems) => {
      const children = [];
      const childrenIds = menuItems[id].childrenIds;
      childrenIds.forEach((childId) => {
        children.push(menuItems[childId]);
      });
      cb(children);
    });
  }

  static update(id, label) {
    getMenuItems((menuItems) => {
      menuItems[id].label = label;
      fs.writeFile(p, JSON.stringify(menuItems), (err) => {
        console.log(err);
      });
    });
  }

  static delete(id) {
    getMenuItems((menuItems) => {
      const idsToDelete = [id];
      for (let idIndex = 0; idIndex < idsToDelete.length; idIndex++) {
        const currId = idsToDelete[idIndex];
        idsToDelete.push(...menuItems[currId].childrenIds);
        delete menuItems[currId];
      }

      for (const currItem in menuItems) {
        if (menuItems[currItem].childrenIds.includes(id)) {
          menuItems[currItem].childrenIds = menuItems[
            currItem
          ].childrenIds.filter((childId) => childId !== id);
        }
      }

      fs.writeFile(p, JSON.stringify(menuItems), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getMenuItems(cb);
  }
};
