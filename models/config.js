import mongoose from "mongoose";

const ConfigSchema = mongoose.Schema(
    {
        website_title: {
            type: String,
            required: [true, "Please provide a Website Title."],
            default: "SVRT E-Commerce For Rent.",
        },
        website_name: {
            type: String,
            required: [true, "Please provide a Website Title."],
            default: "SVRT",
        },
        website_icon: {
            type: String,
            required: [true, "Please provide a Website Icon."],
        },
        website_thumbnail: {
            type: String,
            required: [true, "Please provide a Website Thumbnail."],
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
    },
    {
        capped: { size: 1024, max: 1 },
    }
);

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
