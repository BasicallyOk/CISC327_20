import mongoose from 'mongoose';
const { Schema } = mongoose;

const Review = mongoose.model('Review', reviewSchema);

const reviewSchema = new Schema({
    listing: String,
    user: String,
    comments: [{ body: String, date: Date}],
    date: {type: Date, default: Date.now},
    hidden: Boolean,
    meta: {
        score: Number 
    }
});