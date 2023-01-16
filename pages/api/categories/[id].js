import dbConnect from "../../../lib/db-connect";
import Category from "../../../models/category";

export default async function handler(req, res) {
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
                    message: "Category not found.",
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
