const usercontroller = require("./controllers/usercontroller")

const express = require("express")
const router = express.Router()

router.post("/checkuserlogin",usercontroller.checkuserlogin)
router.post("/insertuser",usercontroller.insertuser)



module.exports = router