const schema = require('mongoose').Schema;

const definition = {
	"_id": {
		"type": String,
		"required": true,
	},
	"clinicId": {
		"type": String,
		"required": true,
	},
	'productId': {
		"type": String,
		"required": true,
	},
	"unitOfMeasure": {
		"type": Number,
		"unit": String,
	},
	"stock": {
		"type": Number,
	},

	"_metadata": {
		"createdAt": {
			"type": Date,
			"default": new Date()
		},
		"lastUpdatedAt": {
			"type": Date,
			"required": true,
		},
		"updatedBy": {
			"type": String,
			"required": true,
		},

		"isDeleted": {

			"type": Boolean,
			"default": false,
		},
		"version": {
			"type": Number,
			"default": 1
		}
	}
}

module.exports = schema(definition);
