import mongoose from "mongoose";

const QueueSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    product_name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    form: {
        username: {
            type: String,
        },
        password: {
            type: String
        },
        uid: {
            type: String
        }
    },
    status: {
        type: String,
        default: "กำลังดำเนินการ",
        enum: ["กำลังดำเนินการ", "สำเร็จ", "ไม่สำเร็จ", "ยกเลิก"]
    },
    note: {
        type: String,
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

export default mongoose.models.Queue || mongoose.model("Queue", QueueSchema);
