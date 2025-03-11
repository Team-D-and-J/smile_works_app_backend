const schema = require('mongoose').Schema;

const definition = {
	"_id": String,
	"insuranceCompany": String,
	"discount": {
		"type": Number,
		default: 0,
	},
	"memberId": {
		"type": String,
		"required": true,
	},
	"groupNumber": {
		"type": String,
	},
	"userId": {
		"type": String
	},
	_metadata: {
		"createdAt": {
			"type": Date,
			"default": new Date()
		},
		"lastUpdatedAt": {
			"type": Date,
			"default": Date.now,
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
