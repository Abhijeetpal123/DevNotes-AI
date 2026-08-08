const express = require("express")
const  {summarizeNote} = require("../controllers/ai.controller.js");
const protect  =require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/summarize", protect, summarizeNote);

module.exports= router;
