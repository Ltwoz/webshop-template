import dbConnect from "../../../lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "../../../middlewares/auth";
import Coupon from "../../../models/coupon";
import User from "../../../models/user";
import Topup from "../../../models/topup";
import { customAlphabet } from "nanoid";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const { code } = req.body;

                const nanoid = customAlphabet(
                    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                    10
                );

                const coupon = await Coupon.findOne({ code: code });

                if (!code || !coupon) {
                    return res.status(404).json({
                        success: false,
                        message: `โค้ดไม่ถูกต้องหรือไม่มีโค้ดนี้ในระบบ`,
                    });
                }
                
                if (coupon.redeemedBy?.includes(req.user.id)) {
                    return res.status(406).json({
                        success: false,
                        message: `คุณเคยใช้โค้ดไปแล้ว`,
                    });
                }

                const remainingRedemptions = coupon.limit - coupon.redeemedBy.length;

                if (remainingRedemptions === 0) {
                    return res.status(406).json({
                        success: false,
                        message: `โค้ดนี้ถูกใช้หมดแล้ว`,
                    });
                }

                const topup = await Topup.create({
                    _id: nanoid(),
                    type: "COUPON",
                    amount: coupon.value,
                    reference: coupon.code,
                    user: req.user.id,
                })

                //* Update Coupon Redeemed User.
                coupon.redeemedBy.push(req.user.id);
                await coupon.save({ validateBeforeSave: false });

                //* New point after topup.
                const newPoint = req.user.point + coupon.value;

                //* Update point.
                const user = await User.findById(req.user.id);
                user.point = newPoint;

                //* Save.
                await user.save({ validateBeforeSave: false });

                res.status(201).json({ success: true, topup });
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
