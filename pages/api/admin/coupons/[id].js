import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Coupon from "../../../../models/coupon";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const coupon = await Coupon.findById(req.query.id);

                if (!coupon) {
                    res.status(404).json({
                        success: false,
                        message: "Coupon not found.",
                    });
                }

                res.status(200).json({
                    success: true,
                    coupon,
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
                const { code, value, limit } = req.body;

                let coupon = await Coupon.findById(req.query.id);

                if (!coupon) {
                    res.status(404).json({
                        success: false,
                        message: "Coupon not found.",
                    });
                }

                coupon = await Coupon.findByIdAndUpdate(
                    req.query.id,
                    {
                        code,
                        value,
                        limit,
                    },
                    {
                        new: true,
                        runValidators: true,
                        useFindAndModify: true,
                    }
                );

                res.status(200).json({ success: true, coupon });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        case "DELETE":
            try {
                const coupon = await Coupon.findById(req.query.id);

                if (!coupon) {
                    res.status(400).json({
                        success: false,
                        message: "Coupon not found.",
                    });
                }

                await coupon.remove();

                res.status(200).json({
                    success: true,
                    message: "Coupon Delete Successfully.",
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

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
