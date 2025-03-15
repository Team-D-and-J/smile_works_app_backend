const schema = require("mongoose").Schema;

const billingSchema = {
    _id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    description: {
        type: String,
        trim: true,
    },
    insurance: {
        type: String
    },
    type: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        default: "Pending",
    },
    patientId: {
        type: String,
        required: true
    },
    _metadata: {
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        lastUpdatedAt: { 
            type: Date, 
            default: Date.now, 
            required: true 
        },
        updatedBy: { 
            type: String, 
            required: true 
        },
        isDeleted: { 
            type: Boolean, 
            default: false 
        },
        version: { 
            type: Number, 
            default: 1 
        }
    }
};

module.exports = schema(billingSchema);