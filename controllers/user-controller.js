const Note = require("../models/note-model");

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