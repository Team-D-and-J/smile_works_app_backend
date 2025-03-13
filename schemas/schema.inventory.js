const { stringify } = require("uuid");

const schema = require("mongoose").Schema;

const definition = {
	_id: {
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
	unitPrice: {
		type: String,
		required: true,
	},
	unitOfMeasure: {
		type: String,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	stockThreshold: {
		type: Number,
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
			default: new Date(),
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
