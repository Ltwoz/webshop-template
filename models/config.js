import mongoose from "mongoose";

const ConfigSchema = mongoose.Schema(
    {
        website_title: {
            type: String,
        },
        website_name: {
            type: String,
        },
        website_desc: {
            type: String,
        },
        website_icon: {
            type: String,
        },
        website_logo: {
            type: String,
        },
        website_banner: {
            type: String,
        },
        announcement: {
            type: String,
        },
        recaptcha_key: {
            type: String,
        },
        payment: {
            truemoney_phone: {
                type: String,
                maxLength: 10
            }
        },
        style: {
            primary_color: {
                type: String,
                default: "#5c6ac4"
            },
            secondary_color: {
                type: String,
                default: "#05386b"
            },
            background_image: {
                type: String,
            },
            background_color: {
                type: String,
            }
        },
        social: {
            discord_url: String,
            facebook_url: String
        }
    },
);

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
