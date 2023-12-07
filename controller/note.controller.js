const Note = require("../model/Notes");

// creating a note which belongs to a user.
const createNote = async (req, res) => {
  try {
    const { heading, paragraph, userId } = req.body;
    if (!heading || !paragraph) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields." });
    }
    const newNote = new Note({ heading, paragraph, userId });
    await newNote.save();
    res.status(200).json({
      success: true,
      message: "A new note added to the list.",
      note: newNote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// editing a node that too belongs to a user.
const editNote = async (req, res) => {
  try {
    const { heading, paragraph } = req.body;
    if (!heading && !paragraph) {
      return res
        .status(400)
        .json({ success: false, message: "Nothing selected to edit." });
    }

    const noteId = req.params.id; 

    const existingNote = await Note.findById(noteId);
    if (!existingNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found." });
    }
    const updatedNote = await Note.updateOne({_id:noteId},{heading,paragraph},{new:true});
    res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      note: existingNote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// this also belongs to a user's specific post.
const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found." });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
      note: deletedNote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// a post of any user.
const getNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found." });
    }

    res.status(200).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// deleting all nodes of a user.
const deleteAllNote = async (req, res) => {
  try {
    await Note.deleteMany({userId: req.body.userId });
    res.status(200).json({ success: true, message: "All notes deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllNote = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.body.userId });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createNote,
  editNote,
  deleteNote,
  getNote,
  deleteAllNote,
  getAllNote,
};
