import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";
import sendToken from "../../../utils/send-token";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const { username, password } = req.body;

                if (
                    !username ||
                    username.trim() === "" ||
                    !password ||
                    password.trim() === ""
                ) {
                    return res.status(422).json({
                        success: false,
                        message: "Invalid input.",
                    });
                }

                const user = await User.findOne({ username }).select(
                    "+password"
                );

                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid username or password",
                    });
                }

                const isPasswordMatched = await user.comparePassword(password);

                if (!isPasswordMatched) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid username or password",
                    });
                }

                sendToken(user, 200, res);
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;
        default:
            res.status(405).json({ success: false, message: "Method not allowed" });
            break;
    }
};

export default handler;
