const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res
                 .status(400)
                 .json({ success: false, message: "All fields are required "});
        }
        const CategorysDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(CategorysDetails);
        return res.status(200).json({
            success: true,
            message: error.message,
        });
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message,
        });
    }
};

exports.showAllCategories = async (req, res) => {
    try {
        const allCategorys = await Category.find(
            {},
            { name: true, description: true}
        );
        res.status(200).json({
            success: true,
            data: allCategorys,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message,
        });
    }
};

exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        //Get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
             .populate("curses")
             .exec();
        console.log(selectedCategory);
        //Validation
        if (!selectedCategory) {
            console.log("Category not found.");
            return res.status(404).json({
                success: false, message: "Data not found"});
        }
        //get coursefor different categories
        if(selectedCategory.courses.length === 0) {
            console.log ("No courses found for the selected category.");
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category."
            });
        }

        const selectedCourses = selectedCategory.courses;

        //Get coursefor different categories
        const differentCategories = await Category.find({
            _id: { $ne: categoryId },
        }).populate("course")
        .exec();
        let differrentCourses = [];
        for (const category of categoriesExceptSelected) {
            differrentCourses.push(...Category.courses);
        }

        //Get top-selling courses across all categories
        const allCategories = await Category.find().populate("courses");
        const allCourses =  allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);

        res.status(200).json({
            selectedCourses: selectedCategory,
            differrentCourses: differrentCourses,
            mostSellingCourses: mostSellingCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

