const express = require("express");
const userRouter = require("./user");
const router = express.Router();

router.use("/user", (req, res) => {});

module.exports = router;
    