const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collection-controller");


router.get("/",collectionController.getCollections);

router.get("/:collectionId",collectionController.getCollectionDeatils);


router.get("/add-collection",collectionController.getAddCollection);
router.post("/add-collection",collectionController.postAddCollection);

exports.routes = router;