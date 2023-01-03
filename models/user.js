import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter username."],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Please enter email."],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please enter password."],
            minLength: [8, "Password should be more than 8 characters"],
            select: false,
        },
        role: {
            type: String,
            default: "member",
            enum: ["member", "admin", "owner"],
        },
        point: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
