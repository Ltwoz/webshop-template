import dbConnect from "../../../lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "../../../middlewares/auth";
import Coupon from "../../../models/coupon";
import User from "../../../models/user";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const { code } = req.body;

                const coupon = await Coupon.findOne({ code: code });

                if (!code || !coupon) {
                    return res.status(404).json({
                        success: false,
                        message: `โค้ดไม่ถูกต้องหรือไม่มีโค้ดนี้ในระบบ`,
                    });
                }

                const remainingRedemptions = coupon.limit - coupon.redeemedBy.length;

                if (remainingRedemptions === 0) {
                    return res.status(404).json({
                        success: false,
                        message: `โค้ดนี้ถูกใช้หมดแล้ว`,
                    });
                }

                if (coupon.redeemedBy?.includes(req.user.id)) {
                    return res.status(400).json({
                        success: false,
                        message: `คุณเคยใช้โค้ดไปแล้ว`,
                    });
                }

                //* New point after topup
                const newPoint = req.user.point + coupon.value;

                //* Update point
                const user = await User.findById(req.user.id);
                user.point = newPoint;

                //* Save
                await user.save({ validateBeforeSave: false });

                res.status(201).json({ success: true, coupon });
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
};

export default isAuthenticatedUser(handler);
