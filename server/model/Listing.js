import mongoose, { Schema, ObjectId } from 'mongoose'

const ListingSchema = new Schema({
    address :{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: false
    },

    price: {
        type: Number, 
        required: true
    }, 
    
    picture_url:{
        type: String,
        required: true
    },

    review_score:{
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Listing',ListingSchema)