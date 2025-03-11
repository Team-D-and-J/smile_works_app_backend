const schema = require("mongoose").Schema;

const clinicSchema = new schema({
    clinicId: {
        type: String,
        required: true,
        unique: true,
    },
    clinicName: {
        type: String,
        required: true,
    },
    organizationId: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    treatmentMasterIds: {
        type: [String],  // This defines a list (array) of strings
        required: true,
    },
    _metadata: {
        createdAt: {
            type: Date,
            default: Date.now,
        },
        lastUpdatedAt: {
            type: Date,
            default: Date.now,
        },
        updatedBy: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        version: {
            type: Number,
            default: 1,
        },
    },
});

module.exports = schema(clinicSchema);