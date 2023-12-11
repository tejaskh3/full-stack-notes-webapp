const express = require("express");
const router = express.Router();
const {
  createNote,
  editNote,
  deleteNote,
  getNote,
  deleteAllNote,
  getAllNote
} = require("../controller/note.controller");

router.route('/').delete(deleteAllNote).get(getAllNote);
router.post('/create', createNote);
router.route('/:id').get(getNote).patch(editNote).delete(deleteNote);

module.exports = router;
