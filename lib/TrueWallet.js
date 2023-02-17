import { fetch } from "undici";

import tls from "tls";
tls.DEFAULT_MIN_VERSION = "TLSv1.3";

class TrueWallet {
    constructor(phoneNumber) {
        if (!phoneNumber || phoneNumber.length != 10) {
            throw new Error("Please provide a phone number 10 digits");
        }

        this.phoneNumber = phoneNumber;
    }

    async redeem(code) {
        let url = (code += "").split("v=");

        if (18 != (code = (url[1] || url[0]).match(/[0-9A-Za-z]+/)[0]).length)
            throw new Error("ลิงก์ไม่ถูกต้อง");

        try {
            let o = await fetch(
                `https://gift.truemoney.com/campaign/vouchers/${code}/redeem`,
                {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        mobile: this.phoneNumber,
                        voucher_hash: code,
                    }),
                }
            ).then((res) => res.json());

            if ("SUCCESS" == o.status.code)
                return {
                    amount: Number(
                        o.data.my_ticket.amount_baht.replace(/,/g, "")
                    ),
                    owner_name: o.data.owner_profile.full_name,
                    code: code,
                };
        } catch (err) {
            throw new Error("ลิงก์นี้ถูกใช้ไปแล้ว");
        }
    }

    generate_crc() {}
}

export default TrueWallet;
