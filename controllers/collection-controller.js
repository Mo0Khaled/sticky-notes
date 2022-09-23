const Collection = require("../models/collection-model");

exports.getCollections = (req, res, next) => {
  Collection.find({ userId: req.user._id })
    .then((collections) => {
      res.render("collection/collections", {
        pageTitle: "Collections",
        collections: collections,
        path: "/collection",
      });
    })
    .catch((error) => console.log(error));
};

exports.getCollectionDetails = (req, res, next) => {
  const collectionId = req.params.collectionId;
  Collection.findById(collectionId)
    .then((collection) => {
      res.render("collection/collection-details", {
        pageTitle: "Collection Deatils",
        collection: collection,
        path: "/collection",
      });
    })
    .catch((error) => console.log(error));
};

exports.getAddCollection = (req, res, next) => {
  res.render("collection/edit-collection", {
    pageTitle: "Add Collection",
    editing: false,
    path: "/collection/add-collection",
  });
};

exports.postAddCollection = (req, res, next) => {
  const title = req.body.title;
  const collection = Collection({
    title: title,
    userId: req.user,
  });
  collection.save().then((result) => {
    console.log(result);
    res.redirect("/collection");
  });
};

exports.getEditCollection = (req, res, next) => {
  const collectionId = req.params.collectionId;
  Collection.findById(collectionId).then((collection) => {
    res.render("collection/edit-collection", {
      pageTitle: "Add Collection",
      editing: true,
      collection: collection,
      path: "/collection/add-collection",
    });
  });
};

exports.postEditCollection = (req, res, next) => {
  const collectionId = req.body.collectionId;
  Collection.findById(collectionId)
    .then((collection) => {
      collection.title = req.body.title;
      return collection.save();
    })
    .then(() => {
      res.redirect("/collection");
    })
    .catch((error) => console.log(error));
};

exports.postDeleteCollection = (req, res, next) => {
  const collectionId = req.body.collectionId;
  Collection.findByIdAndRemove(collectionId)
    .then(() => {
      res.redirect("/collection");
    })
    .catch((error) => console.log(error));
};

exports.postDeleteNote = (req, res, next) => {
    const collectionId = req.body.collectionId;
    const noteId = req.body.noteId;

    Collection.findById(collectionId)
      .then((collection) => {
        return collection.removeNote(noteId);
      }).then(()=>{
      res.redirect("/collection");
      })
      .catch((error) => console.log(error));
  };
  