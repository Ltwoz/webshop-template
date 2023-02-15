import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";
import { isAuthenticatedUser } from "../../../middlewares/auth";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "PUT":
            try {
                const user = await User.findById(req.user.id).select(
                    "+password"
                );

                const isPasswordMatched = await user.comparePassword(
                    req.body.oldPassword
                );

                if (!isPasswordMatched) {
                    return res.status(400).json({
                        success: false,
                        message: "รหัสผ่านปัจจุบันไม่ถูกต้อง",
                    });
                }

                if (req.body.newPassword !== req.body.confirmPassword) {
                    return res
                        .status(400)
                        .json({ success: false, message: "รหัสผ่านไม่ตรงกัน" });
                }

                user.password = req.body.newPassword;

                await user.save();

                res.status(200).json({ success: true, user });
            } catch (error) {
                res.status(400).json({
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
