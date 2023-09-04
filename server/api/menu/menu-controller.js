const MenuItem = require("./menu-service.js");

const getRootMenu = async (req, res) => {
  try {
    MenuItem.getRoot((root) => res.send(root));
  } catch (err) {
    console.log("Could not find root menu", err);
    res.status(500).send({ err: "Could not find root menu" });
  }
};

const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.fetchAll((items) => res.json(items));
  } catch (err) {
    console.log("Could not find root menu", err);
    res.status(500).json({ err: "Could not find root menu" });
  }
};

const getMenuItemsChildren = async (req, res) => {
  try {
    const { id } = req.params;
    MenuItem.getChildren(id, (children) => {
      res.send(children);
    });
  } catch (err) {
    console.log("Could not find menu item children", err);
    res.status(500).send({ err: "Could not find menu item children" });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;
    const item = await MenuItem.update(id, label);
    res.send({ message: "Updated menu item" });
  } catch (err) {
    console.log("Could not update menu item", err);
    res.status(500).send({ err: "Could not update menu item" });
  }
};

const postMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body.label);
    const parentId = req.body.parentId;
    newItem.create(parentId, (item) => {
      res.send(item);
    });
  } catch (err) {
    console.log("Could not create menu item", err);
    res.status(500).send({ err: "Could not create menu item" });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    MenuItem.delete(id);
    res.send({ message: "Deleted menu item" });
  } catch (err) {
    console.log("Could not delete menu item", err);
    res.status(500).send({ err: "Could not delete menu item" });
  }
};

module.exports = {
  getRootMenu,
  getMenuItems,
  postMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItemsChildren,
};
