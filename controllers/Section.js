const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try{
        //Extract the required properties from the request body
        const {sectionectionName, courseId} = req.body;
        //data validation
        if(!SectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:'Missing required Properties',
            });
        }
        //create a new section with the given name
        const newSection = await Section.create({sectionName});
        //Add the new section to the course's content array
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true}
        )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

    //Return the updated course object in the 
      res.status(200).json({
        success:true,
        message:"Section created successfully",
        updatedCourse,
     });
    }
    catch(error) {
        //Handle errors
       res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        });
    }
}

exports.updateSection = async (req, res) => {
    try {


        //data input
        const {sectionName, sectionId} = req.body;
        //data validation
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
        }
        //update data 
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName}, {new:true});
        //return resonse
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
        });

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update Section ,please try again",
            
        });
        

    }
};

exports.deleteSection = async (req, res) => {
    try{
        //get id - assuming that we are sending Id in params
        const {sectionId} = req.params
        //use findByIdandDelete
        await Section.findByIdAndDelete(sectionId);
        //TODO[Test] :do we need to delete the entry from the course schema ??        
        //return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successulluy",
        })

    }
    catch{
        return res.status(500).json({
            success:false,
            message:"Unable to update Section ,please try again",
            error:error.message,
            
        });
    }
}