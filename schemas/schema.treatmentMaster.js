const schema = require("mongoose").Schema;

const DataPointSchema = schema({
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    type: { type: String, required: true },
    subType: { type: String },
    enum: { type: [String] },
    isMandatory: { type: Boolean, default: false }
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