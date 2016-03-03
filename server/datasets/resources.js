var mongoose = require('mongoose');
module.exports = mongoose.model('Resource',{
    user: String,
    userId: String,
    userImage: String,
    video: String,
    date: {type: Date, default:Date.now}
}) 