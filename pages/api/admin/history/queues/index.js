import dbConnect from "../../../../../lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "../../../../../middlewares/auth";
import Queue from "../../../../../models/queue";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const queues = await Queue.find().populate("user", "username");

                res.status(200).json({
                    success: true,
                    queues,
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