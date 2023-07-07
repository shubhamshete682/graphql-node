const { Quote, Comment } = require('../models/quote')

module.exports = {
    quotes: async function () {
        const quotes = await Quote.find().populate('comments');

        return {
            quotes: quotes.map(q => ({
                _id: q._id.toString(),
                author: q.author,
                comments: q.comments.map(c => ({
                    _id: c._id.toString(),
                    msg: c.msg,
                })),
            })),
        };
    },

    quote: async (id) => {
        return await Quote.findById(id).populate('comments')
    },

    createQuote: async function ({ quoteInput }) {
        const quote = new Quote({
            quote: quoteInput.quote,
            author: quoteInput.author,
        });

        const createdQuote = await quote.save();

        // Create and attach comments to the created quote
        const comments = quoteInput.comments || [];
        const quoteId = createdQuote._id;

        for (const comment of comments) {
            const newComment = new Comment({
                msg: comment.msg,
            });

            await newComment.save();
            createdQuote.comments.push(newComment);
        }

        await createdQuote.save();

        return {
            ...createdQuote._doc,
            _id: createdQuote._id.toString(),
        };
    },

    deleteQuote: async function ({ id }) {

        const quote = await Quote.findById(id)
        if (!quote) {
            throw err("not found")
        }

        const deleteQuote = await Quote.findByIdAndDelete(id)
        return {
            ...deleteQuote._doc,
            _id: deleteQuote._id.toString()
        }
    },

  

} 