const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
    {
        plate: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        establishmentId: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Products', ProductsSchema);