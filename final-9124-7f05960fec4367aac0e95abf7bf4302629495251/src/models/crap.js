const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema(
    {
        type: {type: String,
        enum: ["Point"], 
        required: true, 
        default: "Point"},
        coordinates: {type: [Number], required: true },
    },
    {_id: false}
);

const SuggestionSchema = new mongoose.Schema(
    {
        address: {type: String, required: true, minlenght: 3, maxlenght: 255 },
        date: {type: Date, required: true },
        time: {type: String, required: true },
    },
    {_id: false}
);

const CrapSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, minlenght: 3, maxlenght: 255 },
        description: {type: String, required: true, minlenght: 3, maxlenght: 255 },
        location: {type: pointSchema, required: true },
        images: {type: [String], required: true },
        status: {
            type: String,
            enum: ["AVAILABLE", "INTERESTED", "SCHEDULED", "AGREED", "FLUSHED"],
            default: "AVAILABLE",
        },
        owner: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        buyer: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        suggestion: {type: SuggestionSchema, default: null },
    },
    {timestamps: true}
);

CrapSchema.index({ location: "2dsphere" });


module.exports = mongoose.model("Crap", CrapSchema);

//cest la facon qu'il vont apparitre sur mG
//times t aj creAt et upAt automa