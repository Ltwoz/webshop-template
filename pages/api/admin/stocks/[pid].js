import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Product from "../../../../models/product";
import Stock from "../../../../models/stock";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const { stock_data } = req.body;
                const product_id = req.query.pid;

                const stock = await Stock.create({
                    product: product_id,
                    stock_data: stock_data,
                });

                if (!stock) {
                    res.status(400).json({
                        success: false,
                        message: "Fail to create stock.",
                    });
                }

                const filtered_stock = await Stock.find({
                    product: product_id,
                });

                const product = await Product.findByIdAndUpdate(
                    product_id,
                    {
                        stock: filtered_stock.length,
                    },
                    { new: true }
                );

                console.log(product);

                res.status(200).json({ success: true, product });
            } catch (error) {
                res.status(404).json({
                    success: false,
                    message: "Products not found.",
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
};

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
