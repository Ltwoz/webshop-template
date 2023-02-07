import { nanoid } from "nanoid";
import dbConnect from "../../../lib/db-connect";
import { isAuthenticatedUser } from "../../../middlewares/auth";
import Product from "../../../models/product";
import Queue from "../../../models/queue";
import User from "../../../models/user";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const { product_id, username, password, uid } = req.body;

                const product = await Product.findById(product_id);

                //* point remaining after bougth
                const calPoint = req.user.point - product.price;

                //* if not enough point return error
                if (calPoint < 0) {
                    const needPoint = product.price - req.user.point;
                    return res.status(402).json({
                        success: false,
                        message: `พอยต์ไม่เพียงพอ ต้องการอีก ${needPoint} พอยต์.`,
                    });
                }

                //* if amount is 0 return error
                if (product.isActive === false) {
                    return res.status(406).json({
                        success: false,
                        message: `ไม่เปิดให้บริการ`,
                    });
                }

                //* update user point
                const user = await User.findById(req.user.id);
                user.point = calPoint;
                await user.save({ validateBeforeSave: false });

                const queue = await Queue.create({
                    _id: nanoid(10),
                    product_name: product.name,
                    price: product.price,
                    form: uid
                        ? { uid: uid }
                        : { username: username, password: password },
                    user: req.user.id,
                });

                //* Increment Sold
                product.sold += 1;
                const savedProduct = await product.save();

                if (!savedProduct) {
                    return res.status(500).json({
                        success: false,
                        message: "Could not save the product",
                    });
                }

                res.status(200).json({
                    success: true,
                    queue,
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
