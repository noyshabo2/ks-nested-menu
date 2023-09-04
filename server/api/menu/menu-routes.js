const express = require("express");
const menuController = require("./menu-controller.js");

const router = express.Router();

router.get("/:id/children", menuController.getMenuItemsChildren);
router.get("/", menuController.getMenuItems);
router.get("/root", menuController.getRootMenu);
router.post("/", menuController.postMenuItem);
router.put("/:id", menuController.updateMenuItem);
router.delete("/:id", menuController.deleteMenuItem);

module.exports = router;
