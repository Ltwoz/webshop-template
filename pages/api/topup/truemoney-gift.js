import axios from "axios";
import dbConnect from "../../../lib/db-connect";
import Topup from "../../../models/topup";

const redeem = async (phone, gift_url) => {
    const url_template = "https://gift.truemoney.com/campaign/";

    if (10 != phone.trim().length || 0 != phone.trim()[0]) {
        return res.status(403).json({
            success: false,
            message: "Invalide voucher",
        });
    }

    if (
        !gift_url.includes(`${url_template}?v=`) ||
        18 != gift_url.split(`${url_template}?v=`)[1].length
    ) {
        return res.status(403).json({
            success: false,
            message: "Invalide voucher",
        });
    }

    const hash = gift_url.split("v=")[1];

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phone, voucher_hash: hash }),
    };

    const response = await fetch(
        `${url_template}vouchers/${hash}/redeem`,
        requestOptions
    );

    if ("SUCCESS" == response.status) return { response };
};

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const userId = req.query.user;

                const { phone, gift_url } = req.body;

                redeem(phone, gift_url)
                    .then((redeemed) => {
                        console.log(redeemed);
                        // const topup = await Topup.create();

                        return res.status(200).json({
                            success: true,
                            amount: redeemed?.amount,
                        });
                    })
                    .catch((error) => {
                        return res.status(404).json({
                            success: false,
                            message: error.message,
                        });
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
