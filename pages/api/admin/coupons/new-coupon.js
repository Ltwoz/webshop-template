import { customAlphabet } from "nanoid";
import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Coupon from "../../../../models/coupon";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const { code, value, limit } = req.body;

                const nanoid = customAlphabet(
                    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                    10
                );

                const coupon = await Coupon.create({
                    _id: nanoid(),
                    code,
                    value,
                    limit,
                });

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

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
