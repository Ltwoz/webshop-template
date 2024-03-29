import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    type: {
        type: String,
        required: [true, "Please provide a type for this product."],
        enum: ["STOCK", "ID_PASS"],
    },
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a description for this product."],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price for this product."],
    },
    image: {
        type: String,
        required: [true, "Please provide a image for this product."],
    },
    stock: {
        type: Array,
        default: [],
    },
    stock_count: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    sold: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Product ||
    mongoose.model("Product", ProductSchema);
