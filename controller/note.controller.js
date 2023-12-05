const createNote = async (req, res) => {
  res.send("create Note");
};
const editNote = (req, res) => {
  res.send("edit Note");
};
const deleteNote = (req, res) => {
  res.send("delete note");
};
const getNote = (req, res) => {
  res.send("get single Note");
};
const deleteAllNote = (req, res) => {
  res.send("delete all note");
};
const getAllNote = (req,res) => {
  res.send("get all nodes")
}
module.exports = {
  createNote,
  editNote,
  deleteNote,
  getNote,
  deleteAllNote,
  getAllNote
};
