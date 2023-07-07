const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const quoteSchema = new Schema({

    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})


// Comment schema
const commentSchema = new Schema({
    msg: {
         type: String,
        required: true 
    },
});



const Quote = mongoose.model('Quote', quoteSchema);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Quote,
    Comment,
};