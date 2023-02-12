import dbConnect from "../../../../../lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "../../../../../middlewares/auth";
import Order from "../../../../../models/order";
import ApiFeatures from "../../../../../utils/api-features";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const apiFeature = new ApiFeatures(
                    Order.find().populate("user", "username"),
                    req.query
                )
                    .filter()
                    .searchById();

                const orders = await apiFeature.query;

                res.status(200).json({
                    success: true,
                    orders,
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

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));