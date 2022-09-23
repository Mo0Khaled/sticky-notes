const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collection-controller");


router.get("/",collectionController.getCollections);



router.get("/add-collection",collectionController.getAddCollection);
router.post("/add-collection",collectionController.postAddCollection);
router.get("/add-collection",collectionController.getAddCollection);

router.get("/edit-collection/:collectionId",collectionController.getEditCollection);
router.post("/edit-collection",collectionController.postEditCollection);

router.get("/:collectionId",collectionController.getCollectionDetails);

router.post("/delete-collection", collectionController.postDeleteCollection);

exports.routes = router;