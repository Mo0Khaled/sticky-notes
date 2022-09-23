const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    notes: [{
        note: {
            type: Object,
            required: true,
        }
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    { timestamp: true }
);

collectionSchema.methods.addNote = function(note){
    const notesIndex = this.notes.findIndex(item=>{
        return item.note._id.toString() == note._id.toString();
    });
    let updatedNotes = [...this.notes];
    if(notesIndex >= 0){
        return;
    }else{
        updatedNotes.push({
          note: note,
        });
    }

    this.notes = updatedNotes;
    return this.save();
}
collectionSchema.methods.removeNote = function(noteId){
    const updatedNotes = this.notes.filter(item=>{
        return item.note._id.toString() != noteId.toString();
    });
    this.notes = updatedNotes;
    return this.save();

}
module.exports = mongoose.model("Collection",collectionSchema);