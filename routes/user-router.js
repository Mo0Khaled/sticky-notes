const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
router.get("/notes", userController.getNotes);

router.get("/add-note", userController.getAddNote);

router.post("/add-note", userController.postAddNote);
router.get("/edit-note/:noteId", userController.getEditNote);

router.post("/edit-note", userController.postEditNote);

router.post("/delete-note",userController.postDeleteNote);

router.get("/add-collection/:noteId",userController.getAddCollection)

router.post("/add-collection",userController.postAddCollection)

exports.routes = router;
