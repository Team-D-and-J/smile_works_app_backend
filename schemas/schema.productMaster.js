const schema = require("mongoose").Schema;

const productSchema = {
    productId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    catalogNumber: { 
        type: Number, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    unitOfMeasure: { 
        type: String, 
        required: true 
    },
    unitPrice: { 
        type: Number, 
        required: true 
    },
    vendorName: { 
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
        },
    },
};

module.exports = schema(productSchema);