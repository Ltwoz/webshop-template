import dbConnect from "../../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../../middlewares/auth";
import Queue from "../../../../../models/queue";
import ApiFeatures from "../../../../../utils/api-features";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const resultPerPage = 10;
                const queuesCount = await Queue.countDocuments();
                
                const apiFeature = new ApiFeatures(
                    Queue.find().populate("user", "username"),
                    req.query
                )
                    .filter()
                    .searchById();

                let queues = await apiFeature.query;

                let fiteredQueuesCount = queues.length;

                apiFeature.pagination(resultPerPage);

                queues = await apiFeature.query.clone();

                res.status(200).json({
                    success: true,
                    queues,
                    queuesCount,
                    fiteredQueuesCount,
                    resultPerPage
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
