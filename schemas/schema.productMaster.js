const schema = require("mongoose").Schema;

const productSchema = {
	productId: {
		type: String,
		required: true,
		unique: true,
	},

	name: {
		type: String,
		required: true,
	},
	unitOfMeasure: {
		type: String,
		required: true,
	},
	unitPrice: {
		type: Number,
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
};

module.exports = schema(productSchema);
