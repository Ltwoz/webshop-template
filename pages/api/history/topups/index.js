import dbConnect from "../../../../lib/db-connect";
import { isAuthenticatedUser } from "../../../../middlewares/auth";
import Topup from "../../../../models/topup";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const userId = req.query.user;

                const topups = await Topup.find({ user: userId });

                res.status(200).json({
                    success: true,
                    topups,
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
