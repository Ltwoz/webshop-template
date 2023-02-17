import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    code: {
        type: String,
        required: [true, "กรุณาใส่โค้ดของคูปองนี้"],
        unique: true,
    },
    value: {
        type: Number,
        required: [true, "กรุณาใส่พอยต์ที่จะได้รับ"],
    },
    limit: {
        type: Number,
        required: [true, "กรุณาใส่จำนวนของคูปองนี้"],
    },
    redeemedBy: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.models.Coupon ||
    mongoose.model("Coupon", CouponSchema);
