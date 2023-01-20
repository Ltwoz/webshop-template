import dbConnect from "../../../lib/db-connect";
import { isAuthenticatedUser } from "../../../middlewares/auth";
import Order from "../../../models/order";
import Product from "../../../models/product";
import User from "../../../models/user";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const { product_id, amount } = req.body;

                const product = await Product.findById(product_id);

                const stocks = product.stock;

                //* point remaining after bougth
                const calPoint = req.user.point - product.price;

                //* if not enough point return error
                if (calPoint < 0) {
                    const needPoint = product.price - req.user.point;
                    return res.status(402).json({
                        success: false,
                        message: `Not enough money. Need more ${needPoint} points.`,
                    });
                }

                //* if amount is 0 return error
                if (amount === 0) {
                    return res.status(403).json({
                        success: false,
                        message: `buy something?`,
                    });
                }

                //* if amount more than stocks return error
                if (amount > stocks.length) {
                    return res.status(403).json({
                        success: false,
                        message: `Stock only have ${stocks.length}`,
                    });
                }

                //* get stock by amount
                const stock_data = stocks.splice(0, amount);
                const savedProduct = await product.save();

                if (!savedProduct) {
                    return res.status(500).json({
                        success: false,
                        message: "Could not save the product",
                    });
                }

                //* update user point
                const user = await User.findById(req.user.id);
                user.point = calPoint;
                await user.save({ validateBeforeSave: false });

                //* Map stock_data to create order one by one
                const order = await Promise.all(stock_data.map(async (stock) => {
                    const order = await Order.create({
                        product_name: product.name,
                        price: product.price,
                        stock_data: stock,
                        user: req.user.id
                    })
                    return order;
                }));

                res.status(200).json({
                    success: true,
                    stock_data,
                    order
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

export default isAuthenticatedUser(handler);
