const express = require("express")
const cors = require("cors")
const authRoutes = require("../src/routes/auth.routes.js")

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/auth",authRoutes)

app.get("/",(req,res)=>{
res.send("API is running sucecsfully")
})

module.exports=app;