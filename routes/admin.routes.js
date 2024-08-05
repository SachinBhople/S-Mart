const adminController = require("../controllers/admin.controller")



const router = require("express").Router()

router

    .get("/get-allorder", adminController.getAllorder)

module.exports = router