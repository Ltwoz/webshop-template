import dbConnect from "../../../lib/db-connect";
import Topup from "../../../models/topup";
import User from "../../../models/user";
import { nanoid } from "nanoid";
import TrueWallet from "../../../lib/TrueWallet";
import { isAuthenticatedUser } from "../../../middlewares/auth";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const { phone, gift_url } = req.body;

                const wallet = new TrueWallet(phone);

                const redeemed = await wallet
                    .redeem(gift_url)
                    .catch((error) => {
                        return console.log("error, ", error);
                    });

                const topup = await Topup.create({
                    _id: nanoid(10),
                    type: "TRUEMONEY_GIFT",
                    amount: redeemed.amount,
                    user: req.user.id,
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

export default isAuthenticatedUser(handler);