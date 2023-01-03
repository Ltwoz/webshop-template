import dbConnect from "../../../lib/db-connect";
import Category from "../../../models/category";

export default async function handler (req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const categories = await Category.find();

                res.status(200).json({
                    success: true,
                    categories,
                });
            } catch (error) {
                res.status(404).json({
                    success: false,
                    message: "Categories not found.",
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
