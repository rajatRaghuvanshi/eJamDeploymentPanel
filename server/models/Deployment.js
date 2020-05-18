const mongoose = require('mongoose');

const DeploymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: String,
    templateName: String,
    version: String,
    deployedAt: Date
})

module.exports = mongoose.model("Deployment", DeploymentSchema)