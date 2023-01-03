import dbConnect from "../../lib/db-connect";
import Config from "../../models/config";

export default async function handler(req, res) {
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
        default:
            res.status(405).json({
                success: false,
                message: "Method not allowed.",
            });
            break;
    }
}
