const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const cookieParser = require('cookie-parser');


require("dotenv").config({ path: "./.env" })

const app = express()
app.use(cookieParser())
app.use(express.static("uploads"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/products", require("./routes/product.routes"))
app.use("/api/order", require("./routes/order.routes"))
app.use("/api/user", require("./routes/user.routes"))
app.use("/api/admin", require("./routes/admin.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "resource not found" })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
})

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("mongodb connected")
    app.listen(process.env.PORT, console.log("server Runninng"))
})