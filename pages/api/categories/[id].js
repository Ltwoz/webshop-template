import dbConnect from "../../../lib/db-connect";
import Category from "../../../models/category";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const category = await Category.findById(req.query.id);

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
