const schema = require("mongoose").Schema;
const { v4: uuidv4 } = require("uuid");

const vendorSchema = {
    id: {
        type: String, 
        default: uuidv4,
    },
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0
    },
    _metadata: {
        createdAt: { type: Date, default: Date.now },
        lastUpdatedAt: { type: Date, default: Date.now, required: true },
        updatedBy: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
        version: { type: Number, default: 1 },
    },
};

module.exports = schema(vendorSchema);
