import dbConnect from "../../../../lib/db-connect";
import Product from "../../../../models/product";
import Order from "../../../../models/order";
import User from "../../../../models/user";
import Category from "../../../../models/category";
import Queue from "../../../../models/queue";
import { authorizeRoles, isAuthenticatedUser } from "../../../../middlewares/auth";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const categoryCount = await Category.countDocuments();
                const productCount = await Product.countDocuments();
                const orderCount = await Order.countDocuments();
                const userCount = await User.countDocuments();
                
                const allQueue = await Queue.find();
                const pendingQueue = allQueue.filter((q) => q.status === "pending")

                res.status(200).json({
                    success: true,
                    stats: {
                        categoryCount,
                        productCount,
                        orderCount,
                        userCount,
                        queueCount: allQueue.length,
                        pendingQueueCount: pendingQueue.length,
                    },
                });
            } catch (error) {
                res.status(500).json({
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

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
