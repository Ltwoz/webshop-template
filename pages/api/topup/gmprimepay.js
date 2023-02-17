import dbConnect from "../../../lib/db-connect";
import Topup from "../../../models/topup";
import User from "../../../models/user";
import { customAlphabet } from "nanoid";
import { isAuthenticatedUser } from "../../../middlewares/auth";
import GBPrimePay from "../../../lib/GBPrimePay";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const { phone, gift_url } = req.body;

                const nanoid = customAlphabet(
                    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                    10
                );

                const gbprimepay = new GBPrimePay();

                const response = await gbprimepay.promptpay();

                // new GBPrimePay({
                //     publicKey: "publickey_1234abcd",
                //     gbForm: "#gb-form",
                //     merchantForm: "#checkout-form",
                //     amount: 90.9,
                //     customStyle: {
                //         backgroundColor: "#eaeaea",
                //     },
                //     env: "test", // default prd | optional: test, prd
                // });

                const topup = await Topup.create({
                    _id: nanoid(),
                    type: "PROMPTPAY_QR",
                    // amount: redeemed.amount,
                    // user: req.user.id,
                });

                //* New point after topup
                const newPoint = req.user.point + redeemed.amount;

                //* Update point
                const user = await User.findById(req.user.id);
                user.point = newPoint;

                //* Save
                await user.save({ validateBeforeSave: false });

                return res.status(200).json({
                    success: true,
                    topup,
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: "ไม่สามารถดำเนินการได้",
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

// export default isAuthenticatedUser(handler);
export default handler;
