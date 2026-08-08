const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware.js");
const {
  createNote,
  getAllNotes,
  getSingleNotes,
  updateNote,deleteNote
} = require("../controllers/notes.controller.js");

router.post("/", protect, createNote);
router.get("/", protect, getAllNotes);
router.get("/:id", protect, getSingleNotes);
router.put("/:id",protect,updateNote)
router.delete("/:id",protect,deleteNote)
module.exports = router;
