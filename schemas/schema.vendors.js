const schema = require("mongoose").Schema;
<<<<<<< HEAD
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
=======

const vendorSchema = new schema({
	_id: { type: String, required: true },
	name: { type: String, required: true },
	stock: { type: String, required: true },
	unitPrice: { type: String, required: true },
	unitOfMeasurement: { type: String, required: true },
	stockThreshold: { type: String, required: true },
	brand: { type: String, required: true },
	category: { type: String, required: true },
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
>>>>>>> 00686128446ddfefa6c8c82b325f0a5529c2420a

module.exports = schema(vendorSchema);
