import dbConnect from "../../../lib/db-connect";
import Product from "../../../models/product";
import ApiFeatures from "../../../utils/api-features";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const ApiFeature = new ApiFeatures(
                    Product.find().select("-stock"),
                    req.query
                ).filter();

                let products = await ApiFeature.query;

                res.status(200).json({ success: true, products });
            } catch (error) {
                res.status(404).json({
                    success: false,
                    message: "Products not found.",
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
