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
        type: Number,
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
        default: "pending",
        enum: ["pending", "success", "failed", "cancel"]
    },
    note: {
        type: String,
        default: ""
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
