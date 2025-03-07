const schema = require('mongoose').schema;

const definition = {
	"_id": String,
	"insuranceCompany": String,
	"discount": {
		"type": Number,
		default: 0,
	},
	"userId": {
		"type": String,
		"required": true,
	},
	_metadata: {
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
