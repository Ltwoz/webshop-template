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
        required: [true, "Please provide a type for this category."],
        enum: ["STOCK", "ID_PASS"],
    },
    form_uid: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required: [true, "Please provide a image for this category."],
    },
    products_count: {
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
});

export default mongoose.models.Category ||
    mongoose.model("Category", CategorySchema);
