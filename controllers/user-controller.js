const Note = require("../models/note-model");
const Collection = require("../models/collection-model");

exports.getAddNote = (req,res,next)=>{
    res.render("edit-note", {
      pageTitle: "Add Note",
      editing: false,
      path:"/user/add-note"
    });
}

exports.postAddNote  = (req,res,next)=>{
  const title = req.body.title;
  const color = req.body.color;

  const description = req.body.description;
  const userId = req.user._id;
  const note = new Note({
    title: title,
    description: description,
    userId: userId,
    color:color,
  });
  note
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/user/notes");
    })
    .catch((error) => console.log(error));
}

exports.getEditNote = (req,res,next)=>{
  const editMode = req.query.edit;

  const noteId = req.params.noteId;
  Note.findById(noteId).then((note) => {
    if (!note) {
      res.redirect("/user/notes");
    }

    res.render("edit-note", {
      pageTitle: "Add Note",
      editing: editMode,
      path: "/user/add-note",
      note: note,
    });
  });
}

exports.postEditNote   = (req,res,next)=>{
  const noteId = req.body.noteId;
  const title = req.body.title;
  const color = req.body.color;

  const description = req.body.description;
  Note.findById(noteId)
    .then((note) => {
      note.title = title;
      note.color = color;
      note.description = description;
      return note.save();
    })
    .then((result) => {
      console.log(result);
      res.redirect("/user/notes");
    })
    .catch((error) => console.log(error));
}



exports.postDeleteNote = (req,res,next)=>{
  const noteId = req.body.noteId;

  Note.findByIdAndRemove(noteId)
  .then((result) => {
    console.log(result);
    res.redirect("/user/notes");
  })
  .catch((error) => console.log(error));

  
}

exports.getNotes = (req,res,next)=>{
  Note.find().then(notes=>{
    res.render("notes", {
      notes: notes,
      pageTitle: "Notes",
      path:"/"
    });
  })
  .catch((error) => console.log(error));

  
}

exports.getAddCollection = (req,res,next)=>{
  const editMode = req.params.edit;
  const noteId = req.params.noteId;
 Collection.find().then(collections=>{
  res.render("add-to-collection", {
    pageTitle: "Add To Collection",
    path:"/",
    collections: collections,
    noteId: noteId,
    editing: editMode,
  });
 })
}

exports.postAddCollection = (req,res,next)=>{
  const noteId = req.body.noteId;
  const collectionId = req.body.collection;
  Note.findById(noteId)
    .then((note) => {
      return note;
    })
    .then((note) => {
      Collection.findById(collectionId).then((collection) => {
        return collection.addNote(note);
      });
    })
    .then(() => {
     res.redirect('/collection');
    })
    .catch((error) => console.log(error));
}