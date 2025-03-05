const schema = require('mongoose').schema

const definition = {
	"productId": {
		"type": String,
		"required": true,
	},
	'catalog_number': {
		"type": String,
		"required": true,
	},
	"name": {
		"type": String,
		"required": true,
	},
	"unit_of_measure": {
		"type": Number,
		"unit": String,
	},
	"quantity_on_hand": {
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

modeul.exports = schema(definition);
