import mongoose from "mongoose";

const ConfigSchema = mongoose.Schema(
    {
        website_title: {
            type: String,
            required: [true, "Please provide a Website Title."],
            default: "SVRT E-Commerce Provider For Rent.",
        },
        website_name: {
            type: String,
            required: [true, "Please provide a Website Title."],
            default: "SVRT",
        },
        website_desc: {
            type: String,
            required: [true, "Please provide a Website Description."],
            default: "SVRT E-Commerce Provider For Rent.",
        },
        website_icon: {
            type: String,
            required: [true, "Please provide a Website Icon."],
        },
        website_logo: {
            type: String,
            required: [true, "Please provide a Website Logo."],
        },
        website_banner: {
            type: String,
            required: [true, "Please provide a Website Banner."],
        },
        announcement: {
            type: String,
            required: true,
        },
        recaptcha_key: {
            type: String,
            required: [true, "Please provide a Recaptcha Key."],
        },
        payment_tw_phone: {
            type: String,
            required: [true, "Please provide a Truemoney Phone Number."],
            maxLength: [10, "Phone number cannot be more than 10 characters"],
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
        }
    },
    {
        capped: { size: 1024, max: 1 },
    }
);

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
