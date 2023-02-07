import dbConnect from "../../../lib/db-connect";
import Category from "../../../models/category";
import Product from "../../../models/product";
import ApiFeatures from "../../../utils/api-features";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const ApiFeature = new ApiFeatures(
                    Product.find()
                        .populate({
                            path: "category",
                            model: Category,
                        })
                        .select("-stock"),
                    req.query
                )
                    .cid()
                    .filter();

                let products = await ApiFeature.query;

                const modifiedProducts = products.map((product) => {
                    if (product.category.type === "ID_PASS") {
                        return {
                            ...product._doc,
                            stock_count: undefined,
                            isFeatured: undefined,
                        };
                    }
                    return product;
                });

                res.status(200).json({
                    success: true,
                    products: modifiedProducts,
                });
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
