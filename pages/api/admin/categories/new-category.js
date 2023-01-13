import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Category from "../../../../models/category";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const { name, description, type, image, slug } = req.body;

                const category = await Category.create({
                    name,
                    description,
                    type,
                    image,
                    slug
                });

                res.status(201).json({ success: true, category });
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
