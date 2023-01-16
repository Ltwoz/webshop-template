import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Category from "../../../../models/category";
import Product from "../../../../models/product";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                let category = await Category.findById(req.query.id);
                
                if (!category) {
                    res.status(404).json({
                        success: false,
                        message: "Category not found.",
                    });
                }

                category = await Category.aggregate([
                    {
                        $match: { _id: category._id },
                    },
                    {
                        $lookup: {
                            from: "products",
                            localField: "_id",
                            foreignField: "category",
                            as: "products",
                        },
                    },
                    {
                        $addFields: {
                            products_count: { $size: "$products" },
                        },
                    },
                ]);

                await Category.findByIdAndUpdate(
                    req.query.id,
                    {
                        products_count: category.products_count,
                    },
                    { new: true }
                );

                res.status(200).json({
                    success: true,
                    category,
                });
            } catch (error) {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        case "PUT":
            try {
                let category = await Category.findById(req.query.id);

                if (!category) {
                    res.status(404).json({
                        success: false,
                        message: "Category not found.",
                    });
                }

                category = await Category.findByIdAndUpdate(
                    req.query.id,
                    req.body,
                    {
                        new: true,
                        runValidators: true,
                        useFindAndModify: true,
                    }
                );

                res.status(200).json({ success: true, category });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        case "DELETE":
            try {
                const category = await Category.findById(req.query.id);

                if (!category) {
                    res.status(400).json({
                        success: false,
                        message: "Category not found.",
                    });
                }

                await Product.deleteMany({ category: req.query.id });

                await category.remove();

                res.status(200).json({
                    success: true,
                    message: "Category Delete Successfully.",
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        default:
            res.status(405).json({
                success: false,
                message: "Method not allowed.",
            });
            break;
    }
};

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
