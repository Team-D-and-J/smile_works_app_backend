const schema = require("mongoose").Schema;

const treatementSchema = {
    treatmentId: {
        type: String,
        required: true,
        unique: true,
    },
    organizationId: {
        type: String,
        required: true,
    },
    patientId: {
        type: String,
        required: true,
    },
    doctorId: {
        type: String,
        required: true,
    },
    treatmentMasterId: {
        type: String,
        required: true,
    },
    steps: {
        type: String
    },
    files: [{
        fileName: { 
            type: String,
            required: true 
        },
        fileLink: { 
            type: String, 
            required: true 
        },
        fileType: { 
            type: String
        },
    }],
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
};

module.exports = schema(treatementSchema);