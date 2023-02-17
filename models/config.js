import mongoose from "mongoose";

const ConfigSchema = mongoose.Schema({
    website_title: {
        type: String,
        default: "Skitzer",
    },
    website_name: {
        type: String,
        default: "Sktz",
    },
    website_desc: {
        type: String,
        default: "Skitzer Solution. E-Commerce Website Provider.",
    },
    website_icon: {
        type: String,
        default: "https://media.discordapp.net/attachments/717327142978977834/1060896307235004467/favicon.png",
    },
    website_logo: {
        type: String,
        default: "",
    },
    website_banner: {
        type: String,
        default: "https://dummyimage.com/1100x240",
    },
    website_image: {
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
        discord_url: {
            type: String,
            default: "",
        },
        facebook_url: {
            type: String,
            default: "https://www.facebook.com/skitzer.xyz",
        },
    },
});

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
