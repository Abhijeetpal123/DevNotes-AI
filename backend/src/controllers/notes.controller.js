const express = require("express");
const Note = require("../models/Notes");

const createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and Content are Required",
      });
    }
    const note = await Note.create({
      title,
      content,
      category,
      user: req.user.id,
    });
    return res.status(400).json({
      success: true,
      message: "Note Created Successfullly",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notes.length,
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getSingleNotes = async (req, res) => {
  try {
    const id = req.params.id;
    const singleNote = await Note.findById(id);
    if (!singleNote) {
      return res.status(404).json({
        success: false,
        message: "Notes not Found",
      });
    }
    if (singleNote.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }
    return res.status(200).json({
      success: true,
      note: singleNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;

    const singleNote = await Note.findById(id);

    if (!singleNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    if (singleNote.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    singleNote.title = title || singleNote.title;
    singleNote.content = content || singleNote.content;
    singleNote.category = category || singleNote.category;

    await singleNote.save();

    return res.status(200).json({
      success: true,
      message: "Note Updated Successfully",
      note: singleNote,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const singleNote = await Note.findById(id);

    if (!singleNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    if (singleNote.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    await singleNote.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Note Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(5000).json({
      success: false,
      message: "Tnternal Server error",
    });
  }
};

module.exports = { createNote, getAllNotes, getSingleNotes, updateNote,deleteNote };
