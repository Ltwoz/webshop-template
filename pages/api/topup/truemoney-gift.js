import axios from "axios";
import dbConnect from "../../../lib/db-connect";
import Topup from "../../../models/topup";

const redeem = async (phone, gift_url) => {
    const url_template = "https://gift.truemoney.com/campaign/";

    if (10 != phone.trim().length || 0 != phone.trim()[0]) {
        throw Error("Invalid Phone number");
    }

    if (
        !gift_url.includes(`${url_template}?v=`) ||
        18 != gift_url.split(`${url_template}?v=`)[1].length
    ) {
        throw Error("Invalid voucher");
    }

    const hash = gift_url.split("v=")[1];

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phone, voucher_hash: hash }),
    };

    const res = await fetch(
        `${url_template}vouchers/${hash}/redeem`,
        requestOptions
    ).then((data) => console.log(data))

    console.log("res, ", res);

    // if ("SUCCESS" == res.status?.code) {
    //     return {
    //         amount: Number(
    //             res?.data?.my_ticket?.amount_baht?.replace(/,/g, "")
    //         ),
    //         owner_name: res.data?.owner_profile?.full_name,
    //         hash: hash,
    //     };
    // }
    // throw Error(`err: ${res}`);
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
                        // const topup = await Topup.create();

                        return res.status(200).json({
                            success: true,
                            amount: redeemed?.amount,
                        });
                    })
                    .catch((error) => {
                        // console.log("error, ", error);
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
