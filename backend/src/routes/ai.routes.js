const express = require("express")
const  {summarizeNote ,explainNote} = require("../controllers/ai.controller.js");
const protect  =require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/summarize", protect, summarizeNote);

router.post("/explain",protect,explainNote)


module.exports= router;
