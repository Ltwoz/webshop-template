import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Product from "../../../../models/product";
import Category from "../../../../models/category";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const product = await Product.create(req.body);

                const categories = await Category.aggregate([
                    {
                        $lookup: {
                            from: "products",
                            localField: "_id",
                            foreignField: "category",
                            as: "products"
                        }
                    },
                    {
                        $addFields: {
                            products_count: { $size: "$products" }
                        }
                    }
                ]);

                for (let category of categories) {
                    await Category.findByIdAndUpdate(category._id, { products_count: category.products_count });
                }

                res.status(201).json({ success: true, product });
            } catch (error) {
                res.status(500).json({
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
}

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
