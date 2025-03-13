const schema = require("mongoose").Schema;

const productSchema = {
	name: {
		type: String,
		required: true,
	},
	unitOfMeasure: {
		type: String,
		required: true,
	},

	brand: {
		type: String,
		required: true,
	},
	category: {
		type: String,
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
