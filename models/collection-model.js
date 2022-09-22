const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collectionScheam = new Schema({
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

module.exports = mongoose.model("Collection",collectionScheam);