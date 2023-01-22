import dbConnect from "../../../../lib/db-connect";
import Queue from "../../../../models/queue";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const userId = req.query.user;

                const queues = await Queue.find({ user: userId }).select("-form");

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
