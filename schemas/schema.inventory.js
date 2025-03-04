const schema = require('mongoose').schema

const definition = {
	"productId": String,
	"quantity": {
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
