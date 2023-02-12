import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import User from "../../../../models/user";
import ApiFeatures from "../../../../utils/api-features";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const apiFeature = new ApiFeatures(User.find(), req.query)
                    .filter()
                    .findUser();

                const users = await apiFeature.query;

                res.status(200).json({ success: true, users });
            } catch (error) {
                res.status(404).json({
                    success: false,
                    message: "Users not found.",
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
