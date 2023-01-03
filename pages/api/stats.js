import dbConnect from "../../lib/db-connect";
import Product from "../../models/product";
import User from "../../models/user";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const productCount = await Product.countDocuments();
                const userCount = await User.countDocuments();

                res.status(200).json({
                    success: true,
                    productCount,
                    userCount,
                });
            } catch (error) {
                res.status(404).json({
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
