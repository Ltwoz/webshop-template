import dbConnect from "../../../lib/db-connect";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                res.setHeader(
                    "Set-Cookie",
                    `token=; max-age=0; HttpOnly; Path=/`
                );

                res.status(200).json({ success: true, message: "Logged Out" });
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
