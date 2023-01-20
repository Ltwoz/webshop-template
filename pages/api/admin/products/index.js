import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Category from "../../../../models/category";
import Product from "../../../../models/product";
import ApiFeatures from "../../../../utils/api-features";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const ApiFeature = new ApiFeatures(Product.find(), req.query)
                    .cid()
                    .filter();

                let products = await ApiFeature.query;

                res.status(200).json({ success: true, products });
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
};

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
