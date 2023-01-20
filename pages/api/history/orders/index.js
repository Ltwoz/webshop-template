import dbConnect from "../../../../lib/db-connect";
import Order from "../../../../models/order";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const userId = req.query.user;

                const orders = await Order.find({ user: userId });

                res.status(200).json({
                    success: true,
                    orders,
                });
            } catch (error) {}
            break;
        default:
            res.status(405).json({
                success: false,
                message: "Method not allowed.",
            });
            break;
    }
}
