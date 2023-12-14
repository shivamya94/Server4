const mongoose = require("mongoose");

//Define the Courses schema
const courseSchema = new mongoose.Schema({
    courseName: { type:String },
    courseDescription: { type:String },
    instructor: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn: {
        type:String,
    },
    CourseContent: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingAndReviews: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviews",
        }
    ],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    },
    tags:{
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        //required true,
        ref: "Category",
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
],
instructions: {
    type: [String],
},
status: {
    type: String,
    enum: ["Draft", "Published"],
},
});

//Export the Courses model
module.exports = mongoose.model("Course", courseSchema);