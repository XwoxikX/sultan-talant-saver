const {model, Schema} = require ("mongoose")



const sultans = new Schema({
	name: {type: String, required: true},
	viziers: [{id: {type: String}, name: {type: String}, talent:{type: Array}}]

}, {timestamps: {createdAt: 'created_at'}})



module.exports = model('Sultan', sultans)
