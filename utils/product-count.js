import Category from "../models/category";

export const updateProductCount = async () => {
    const categories = await Category.aggregate([
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

    for (let category of categories) {
        await Category.findByIdAndUpdate(category._id, {
            products_count: category.products_count,
        });
    }
};
