class GBPrimePay {
    constructor(env = "production") {
        if (env == "production") {
            this.url = "https://api.gbprimepay.com";
        } else {
            this.url = "https://api.globalprimepay.com";
        }
    }

    parse_data(data) {
        let fields = "";
        let index = 0;
        for (let [key, value] of Object.entries(data)) {
            index += 1;
            fields += key + "=" + encodeURIComponent(value);

            if (index != Object.keys(data).length) {
                fields += "&";
            }
        }

        if (this.isToken) {
            fields += "&token=" + encodeURIComponent(this.token);
        } else {
            fields += "&publicKey=" + this.public_key;
            const concatstring =
                data["amount"] +
                data["referenceNo"] +
                data["responseUrl"] +
                data["backgroundUrl"];
            const checksum = require("crypto")
                .createHmac("sha256", this.secret_key)
                .update(concatstring)
                .digest("hex");
            fields += "&checksum=" + checksum;
        }

        return fields;
    }

    request(path, data) {
        const fields = this.parse_data(data);

        const options = {
            url: this.url + path,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: fields,
        };

        return new Promise((resolve, reject) => {
            curl(options, function (err, response, body) {
                if (err) reject(err);
                else resolve(body);
            });
        });
    }

    async promptpay(data, token, mode = "qrcode") {
        this.isToken = true;
        this.token = token;

        let path;
        if (mode == "qrcode") {
            path = "/v3/qrcode";
        } else {
            path = "/v3/qrcode/text";
        }

        const response = await this.request(path, data);
        if (mode == "qrcode") {
            return (
                "data:image/png;base64," +
                Buffer.from(response).toString("base64")
            );
        } else {
            return response;
        }
    }

    truewallet(data, public_key, secret_key) {
        this.isToken = false;
        this.public_key = public_key;
        this.secret_key = secret_key;
        return this.request("/v2/trueWallet", data);
    }
}

export default GBPrimePay;