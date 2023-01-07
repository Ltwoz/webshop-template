import jwt from "jsonwebtoken";
import User from "../models/user";
import catchAsyncErrors from "./catchAsyncErrors";

export const isAuthenticatedUser = (handler) =>
    catchAsyncErrors(async (req, res) => {
        const { token } = req.cookies;
        // console.log("auth cookie :", req.cookies);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please Login to access this resource.",
            });
        }

        try {
            const decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedData.id);

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message:
                        "The user belonging to this token no longer exist.",
                });
            }

            return handler(req, res);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Please Login to access this resource.",
            });
        }
    });

export const authorizeRoles = (handler, ...roles) => {
    return (req, res) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role ${req.user.role} is not allowed to access this resource.`,
            });
        }
        return handler(req, res);
    };
};
