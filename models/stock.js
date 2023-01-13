import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    stock_data: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Stock || mongoose.model("Stock", StockSchema);
