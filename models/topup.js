import mongoose from "mongoose";

const TopupSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    type: {
        type: String,
        required: true,
        enum: ["TRUEMONEY_QR", "TRUEMONEY_GIFT", "TRUEMONEY", "PROMPTPAY_QR", "COUPON"]
    },
    amount: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Topup || mongoose.model("Topup", TopupSchema);
