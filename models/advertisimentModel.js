const mongoose = require("mongoose");

const advertisimentSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        content: { type: String, required: true },
        detail: { type: String, required: true },
        link: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("advertisiment", advertisimentSchema);
