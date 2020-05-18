const mongoose = require('mongoose');

const TemplateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    versions: [String]
})

module.exports = mongoose.model("Template", TemplateSchema)