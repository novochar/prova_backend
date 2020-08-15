const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let CarSchema = new Schema({
    brand: {
        type: String,
        required: true,
        max: 50
    },
    model: {
        type: String,
        required: true,
        max: 50
    },
    color: {
        type: String,
        required: true,
        max: 50
    },
    fuel: {
        type: String,
        enum: ["electric", "hybrid", "gasoline", "diesel", "ethanol", "flex"],
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2020
    },
    price: {
        type: Number,
        required: true,
        min: 100
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    
});

module.exports = mongoose.model('Car', CarSchema);