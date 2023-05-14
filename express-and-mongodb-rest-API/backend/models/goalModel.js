const mongoose = require('mongoose')

/*
const goalSchema = mongoose.Schema({
	text: String
})*/

//create a schema for database
const goalSchema = mongoose.Schema(
	{
	text: {
		type: String,
		required: [true, 'Please add a text value']
		}
	}, {
		timestamps:true
	}
)

//timestamps create an updated at:/created at: field automatically
module.exports = mongoose.model('Goal', goalSchema)


