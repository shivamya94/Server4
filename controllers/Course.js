const Course = require("../models/Course");
const Tag = require("../models/tags");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const Category = require("../models/Category");

//createCourse handler function
exports.createCourse = async (req, res) => {
    try {

        //fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

        //get thumbnail
        const thumbnail = req.file.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success:false,
                message:'All fields are require',
            });
        }

        //check for instructor 
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details ", instructorDetails);

        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found',
            })
        }

        //check given tag is valid or not
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails) {
            return res.status(404).json({
                success:false,
                message:'Tag Details not found',
            });
        }

        //Upload Image top cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.eventNames.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        //add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new:true},
        );
        //update the tag ka schema
        //TODO: homework

        //return response
        return res.status(200)({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create Course",
            error:error.message,
        })

    }
};





//getAllCourses handler function

exports.showAllCourse = async (req, res) => {
    try{
        const allCourses = await Course.find({}, {courseName:true,
                                                  price:true,
                                                  thumbnail:true,
                                                  instructor:true,
                                                  ratingAndReviews:true,
                                                  studentsEnrolled:true,})
                                                  .populate("instructor")
                                                  .exec();
        return res.status(200).json({
            success:true,
            message:'Data for all courses fetched successully',
            data:allCourses,
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Course Fetch course data",
            error:error.message,
        })
    }
};

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
          
        //get id
        const {courseId} = req.body;
        //fiund course details
        const courseDetails = await Course.find(
                                    {_id:courseId})
                                    .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"addtionalDetails",
                                            },
                                        }
                                    )
                                    .populate("category")
                                    .populate("ratingAndreviews")
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection",
                                        },
                                    })
                                    .exec();

                //validation
                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`
                    });
                }
                //return response
                return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:courseDetails,
                })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });

    }
}
