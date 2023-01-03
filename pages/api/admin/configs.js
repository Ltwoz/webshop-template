import dbConnect from "../../../lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "../../../middlewares/auth";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import Config from "../../../models/config";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const configs = await Config.findOne().select("-__v -_id");

                res.status(200).json({
                    success: true,
                    configs,
                });
            } catch (error) {
                res.status(404).json({
                    success: false,
                    message: "Configs not found.",
                });
            }
            break;
        case "POST":
            try {
                const config = await Config.findOneAndUpdate(
                    {},
                    { $set: req.body },
                    { upsert: true }
                );

                res.status(201).json({
                    success: true,
                    config,
                });
            } catch (error) {
                res.status(406).json({
                    success: false,
                    message: "Update Not Acceptable.",
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
