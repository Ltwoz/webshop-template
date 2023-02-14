import dbConnect from "../../../../lib/db-connect";
import { isAuthenticatedUser } from "../../../../middlewares/auth";
import Order from "../../../../models/order";
import ApiFeatures from "../../../../utils/api-features";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const resultPerPage = 20;

                const apiFeature = new ApiFeatures(Order.find(), req.query)
                    .filter()
                    .searchById();

                let orders = await apiFeature.query;

                let fiteredOrdersCount = orders.length;

                apiFeature.pagination(resultPerPage);

                orders = await apiFeature.query.clone();

                const totalPageCount = Math.ceil(
                    fiteredOrdersCount / resultPerPage
                );

                res.status(200).json({
                    success: true,
                    orders,
                    fiteredOrdersCount,
                    totalPageCount,
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

export default isAuthenticatedUser(handler);
