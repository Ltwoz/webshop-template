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
                const { username, email, avatar, confirmPassword } = req.body;

                let user = await User.findById(req.user.id).select("+password");

                const isPasswordMatched = await user.comparePassword(
                    confirmPassword
                );

                if (!isPasswordMatched) {
                    return res.status(400).json({
                        success: false,
                        message: "ยืนยันรหัสผ่านไม่ถูกต้อง",
                    });
                }

                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    return res.status(400).json({
                        success: false,
                        message: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว",
                    });
                }

                user = await User.findByIdAndUpdate(
                    req.user.id,
                    {
                        username,
                        email,
                        avatar,
                    },
                    {
                        new: true,
                        runValidators: true,
                        useFindAndModify: true,
                    }
                );

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
