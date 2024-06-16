const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review= require("./review.js");

const listingSchema=new Schema({
    title :{
        type: String,
        required: true,
    }, 
    description : String,
    image :{
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1712403235961-3d0a14d8e33b?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: function(v) {
                // If the provided value is an empty string, use the fallback URL
                return v === "" 
                    ? "https://images.unsplash.com/photo-1712403235961-3d0a14d8e33b?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : v;
            }
        },
        filename: String,
    },
    price : Number,
    location : String,
    country : String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry:{
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
})

const Listing=mongoose.model("Listing",listingSchema);

module.exports= Listing;