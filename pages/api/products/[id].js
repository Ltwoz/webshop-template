import dbConnect from "../../../lib/db-connect";
import Category from "../../../models/category";
import Product from "../../../models/product";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const product = await Product.findById(req.query.id)
                    .populate({
                        path: "category",
                        model: Category,
                    })
                    .select("-stock");

                res.status(200).json({
                    success: true,
                    product,
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
