// // Import the required modules
// const express = require("express")
// const router = express.Router()

// //Import the controllers

// //Course Controllers Import
// const {
//     createCourse,
//     getAllCourses,
//     getCourseDetails,
// } = require("../controllers/Course")

// //categories Controller Import
// const {
//     showAllCategories,
//     createCategory,
//     categoryPageDetails,
// } = require("../controllers/Category")

// //Section Controllers Import
// const{
//     createSection,
//     updateSection,
//     deleteSection,

// } = require("../controllers/Section")

// //SubSection Contollers Import
// const{
//     createSubSection,
//     updateSubSection,
//     deleteSubSection,
// } = require("../controllers/SubSection")

// //Rating controllers Import
// const{
//     createRating,
//     getAverageRating,
//     getAllRating,
// } = require("../controllers/RatingAndReviews")

// //import Middlewatres
// const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// //*********************************************************************************************************** */
// //                                          Course routes
// //************************************************************************************************************ */

// //Courses can only be Created by Instructors
// router.post("/createCourse", auth, isInstructor, createCourse)
// //Add a Section to a Course
// router.post("/addSection", auth, isInstructor, createSection)
// //update a Section
// router.post("/updateSection", auth, isInstructor, updateSection)
// //Delete a Section
// router.post("/deleteSection", auth, isInstructor, deleteSection)
// //Edit Sub Section
// router.post("updateSubSection", auth, isInstructor, updateSubSection)
// //delete Sub Section
// router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// //Add a SubSection to a Section
// router.post("/addSubSection", auth, isInstructor, createSubSection)
// //Get all Registered Courses
// router.get("getAllCourse", getAllCourses)
// //Get Details for a Specific Course
// router.post("/getCourseDetails", getCourseDetails)





// router.post("/createCategory",auth, isAdmin, createCategory)
// router.get("/showAllCategories",showAllCategories)
// router.post("/getCategoryPageDetails", categoryPageDetails)


// //************************************************************************************************************* */
// //                                         Rating and Review
// //************************************************************************************************************** */
// router.post("/createRating", auth, isStudent, createRating)
// router.get("/getAverageRating", getAverageRating)
// router.get("/getReviews", getAllRating)

// module.exports = router