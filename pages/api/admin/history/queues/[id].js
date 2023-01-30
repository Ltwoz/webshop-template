import dbConnect from "../../../../../lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "../../../../../middlewares/auth";
import Queue from "../../../../../models/queue";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const queue = await Queue.findById(req.query.id);

                if (!queue) {
                    res.status(404).json({
                        success: false,
                        message: "Queue not found.",
                    });
                }

                res.status(200).json({
                    success: true,
                    queue,
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        case "PUT":
            try {
                const { status, note } = req.body;

                let queue = await Queue.findById(req.query.id);

                if (!queue) {
                    res.status(404).json({
                        success: false,
                        message: "Queue not found.",
                    });
                }

                queue = await Queue.findByIdAndUpdate(
                    req.query.id,
                    {
                        status,
                        note,
                    },
                    {
                        new: true,
                        runValidators: true,
                        useFindAndModify: true,
                    }
                );

                res.status(200).json({ success: true, queue });
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
