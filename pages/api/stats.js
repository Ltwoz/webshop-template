import dbConnect from "../../lib/db-connect";
import Product from "../../models/product";
import Order from "../../models/order";
import User from "../../models/user";
import Queue from "../../models/queue";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const productCount = await Product.countDocuments();
                const orderCount = await Order.countDocuments();
                const queueCount = await Queue.countDocuments();
                const userCount = await User.countDocuments();

                const soldCount = orderCount + queueCount

                res.status(200).json({
                    success: true,
                    stats: {
                        productCount,
                        soldCount,
                        userCount,
                    },
                });
            } catch (error) {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        default:
            res.status(405).json({
                success: false,
                message: "Method not allowed.",
            });
            break;
    }
}
