import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this category."],
    },
    description: {
        type: String,
        required: [true, "Please provide a description for this category."],
    },
    image: {
        type: String,
        required: [true, "Please provide a image for this category."],
    },
    slug: {
        type: String,
        required: [true, "Please provide a slug for this category."],
    }
});

export default mongoose.models.Category ||
    mongoose.model("Category", CategorySchema);
