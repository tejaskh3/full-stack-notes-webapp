const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
  heading: {
    type: String,
    required: true,
    maxLength: 100,
  },
  paragraph: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Note",NotesSchema);
