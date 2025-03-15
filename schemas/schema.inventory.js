const schema = require("mongoose").Schema;

const definition = {
	_id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	clinicId: {
		type: String,
		required: true,
	},
	productId: {
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
	stock: {
		type: Number,
	},
	stockThreshold: {
		type: Number,
	},
	brand: {
		type: String,
	},
	category: {
		type: String,
	},

	_metadata: {
		createdAt: {
			type: Date,
			default: Date.now,
		},
		lastUpdatedAt: {
			type: Date,
			required: true,
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

module.exports = schema(definition);