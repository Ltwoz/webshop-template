import mongoose from "mongoose";
import { nanoid } from "nanoid";

const OrderSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: nanoid(10)
    },
    product_name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    stock_data: {
        type: String,
        required: true,
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

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
