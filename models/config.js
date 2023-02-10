import mongoose from "mongoose";

const ConfigSchema = mongoose.Schema({
    website_title: {
        type: String,
        default: "",
    },
    website_name: {
        type: String,
        default: "",
    },
    website_desc: {
        type: String,
        default: "",
    },
    website_icon: {
        type: String,
        default: "",
    },
    website_logo: {
        type: String,
        default: "",
    },
    website_banner: {
        type: String,
        default: "",
    },
    announcement: {
        type: String,
        default: "",
    },
    payment: {
        truemoney_gift: {
            type: Boolean,
            default: true,
        },
        truemoney_qr: {
            type: Boolean,
            default: false,
        },
        truemoney: {
            type: Boolean,
            default: false,
        },
        promptpay_qr: {
            type: Boolean,
            default: false,
        },
        truemoney_phone: {
            type: String,
            maxLength: 10,
            default: "",
        },
    },
    style: {
        primary_color: {
            type: String,
            default: "#5c6ac4",
        },
        background_image: {
            type: String,
            default:
                "https://media.discordapp.net/attachments/829046235527905334/1073568814475776140/roroto-sic-panda-chapeaute-miror.png",
        },
        background_color: {
            type: String,
            default: "#f0f0f0e6",
        },
    },
    social: {
        discord_url: String,
        facebook_url: String,
    },
});

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
