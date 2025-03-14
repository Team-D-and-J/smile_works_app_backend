const schema = require("mongoose").Schema;

const DataPointSchema = schema({
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    type: { type: String, required: true },
    subType: { type: String },
    enum: { type: [String] },
    isMandatory: { type: Boolean, default: false }
});

const SpecificationSchema = schema({
    name: { type: String, required: true }, 
    priceAdjustment: { type: Number, required: true, default: 0 }
});

const treatmentMasterSchema = {
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    /**
     * Specification:
     * - Can be a single string or an array of strings.("Adult", ["Adult","Adolescent" ])
     * - For some treatments (e.g., Braces, Implants), we might need additional details like the type of tooth.
     * - Example values: [{ "name": "Adolescent", "priceAdjustment": 0 },{ "name": "Adult", "priceAdjustment": 500 }]
     */
    specification: {
        type: [SpecificationSchema]
    },
    cost: {
        type: Number,
        required: true
    },
    documentLink: {
        type: String
    },
    supplies: {
        type: schema.Types.Mixed
    },
    dataPoints: {
        type: [DataPointSchema],
        default: []
    },
    _metadata: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        lastUpdatedAt: {
            type: Date,
            default: Date.now
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

module.exports = schema(treatmentMasterSchema);