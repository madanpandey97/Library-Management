const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    summery: { type:String , required: true },
    auther: { type: String, required: true},
    category:{type: String, rquired: true}
    
});

module.exports = mongoose.model('Book', bookSchema);