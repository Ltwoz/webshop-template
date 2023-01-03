import dbConnect from "../../../lib/db-connect";
import Product from "../../../models/product";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const product = await Product.findById(req.query.id);

                res.status(200).json({
                    success: true,
                    product,
                });
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
