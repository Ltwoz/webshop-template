import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "กรุณาใส่ชื่อผู้ใช้งาน"],
            maxLength: [16, "ชื่อผู้ใช้งานต้องไม่เกิน 16 ตัว"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "กรุณาใส่อีเมล"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "กรุณาใส่รหัสผ่าน"],
            minLength: [8, "รหัสผ่านจำเป็นต้องใส่อย่างน้อย 8 ตัว"],
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
