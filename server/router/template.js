const express = require("express");
const router = express.Router();

const Template = require('../models/Template');

router.get("/", (req, res) => {
    Template.find()
        .exec()
        .then(data => {
            res.status(200).json({result: data})
        })
        .catch(error => {
            console.log("error", error);
            res.status(500).json({"error": error})
        })
})

module.exports = router;