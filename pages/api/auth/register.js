import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const { username, email, password } = req.body;

                if (
                    !username ||
                    username.trim() === "" ||
                    !email ||
                    !email.includes("@") ||
                    !password ||
                    password.trim() === ""
                ) {
                    return res.status(422).json({
                        success: false,
                        message: "Invalid input.",
                    });
                }

                const user = await User.create({
                    username,
                    email,
                    password,
                });

                res.status(201).json({
                    success: true,
                    user,
                    message: "success",
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
};

export default handler;
