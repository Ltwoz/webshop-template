import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this category."],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a description for this category."],
    },
    type: {
        type: String,
        required:[true, "Please provide a type for this category."],
        enum: ["STOCK", "ID_PASS"],
    },
    image: {
        type: String,
        required: [true, "Please provide a image for this category."],
    },
    slug: {
        type: String,
        required: [true, "Please provide a slug for this category."],
        unique: true,
    },
    products_count: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.models.Category ||
    mongoose.model("Category", CategorySchema);
