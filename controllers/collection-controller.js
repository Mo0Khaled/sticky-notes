const Collection = require("../models/collection-model");

exports.getCollections = (req, res, next) => {
    Collection.find({ 'userId': req.user._id }).then(collections => {
        res.render("collection/collections", {
            pageTitle: "Collections",
            collections:collections,
            path: "/collection"
        });
    }).catch(error => console.log(error));

}

exports.getCollectionDeatils = (req, res, next) => {
    const collectionId = req.params.collectionId;
    Collection.findById(collectionId).then(collection => {
        res.render("collection/collection-details", {
            pageTitle: "Collection Deatils",
            collection: collection,
            path: "/collection"
        });
    }).catch(error => console.log(error));

}

exports.getAddCollection = (req, res, next) => {
    res.render("collection/edit-collection", {
        pageTitle: "Add Collection",
        editing: false,
        path: "/collection/add-collection"
    });
}

exports.postAddCollection = (req, res, next) => {
    const title = req.body.title;
    const collection = Collection({
        title: title,
        userId: req.user,
    });
    collection.save().then(result => {
        console.log(result);
        res.redirect("/collection");
    })
}