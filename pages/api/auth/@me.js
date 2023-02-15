import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";
import { isAuthenticatedUser } from "../../../middlewares/auth";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const user = await User.findById(req.user.id);

                res.status(200).json({ success: true, user });
            } catch (error) {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        case "PATCH":
            try {
                const user = await User.findById(req.user.id);

                res.status(200).json({ success: true, user });
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
                message: "Method not allowed",
            });
            break;
    }
};

export default isAuthenticatedUser(handler);
