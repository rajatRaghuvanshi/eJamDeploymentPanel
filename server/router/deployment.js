const express = require("express");
const mongoose = require('mongoose');

const Product = require('../models/Deployment');
const { isNull, isDataEmpty } = require('../utils/utils');

const router = express.Router();


router.get("/", (req, res) => {
    Product.find((error, data) => {
        if (error) {
            console.log("error", error);
            res.status(500).json({"error": error})
        } else {
            res.status(200).json({result: data})
        }
    })
})

router.post("/deploy", (req, res) => {
    const {url, version, templateName} = req.body;
    if (
        isDataEmpty(url) ||
        isDataEmpty(version) ||
        isDataEmpty(templateName)
    ) {
        res.status(400).json({Error: "Please provide all required fields ie. url, version, and templateName."});
        return;
    }

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        url: url,
        templateName: templateName,
        version: version,
        deployedAt: Date.now()
    })
    product.save()
        .then(data => {
            res.status(200).json({success: true})
        })
        .catch(error => {
            console.log("error", error);
            res.status(500).json({"error": error})
        })
})

router.delete("/deploy/:id", (req, res) => {
    const id = req.params.id;
    if (
        isNull(id)
    ) {
        res.status(400).json({Error: "Please provide deployment id."});
        return;
    }
    Product.deleteOne({_id: id})
        .exec()
        .then((data) => {
            res.status(200).json({success: true})
        })
        .catch( error => {
            console.log("error", error);
            res.status(500).json({"error": error})
        })
})

module.exports = router;