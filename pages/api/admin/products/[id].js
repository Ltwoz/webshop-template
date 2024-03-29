import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Product from "../../../../models/product";
import { updateProductCount } from "../../../../utils/product-count";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const product = await Product.findById(req.query.id);

                res.status(200).json({ success: true, product });
            } catch (error) {
                res.status(404).json({
                    success: false,
                    message: "Products not found.",
                });
            }
            break;
        case "POST":
            try {
                const { stock } = req.body;

                if (!stock) {
                    return res.status(404).json({
                        success: false,
                        message: "No stock data.",
                    });
                }

                const product = await Product.findById(req.query.id);

                if (!product) {
                    return res.status(404).json({
                        success: false,
                        message: "Products not found.",
                    });
                }

                product.stock = stock
                product.stock_count = product.stock.length
                product.save();

                res.status(200).json({ success: true, product });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        case "PUT":
            try {
                let product = await Product.findById(req.query.id);

                if (!product) {
                    res.status(404).json({
                        success: false,
                        message: "Product not found.",
                    });
                }

                product = await Product.findByIdAndUpdate(
                    req.query.id,
                    req.body,
                    {
                        new: true,
                        runValidators: true,
                        useFindAndModify: true,
                    }
                );

                product.stock_count = product.stock.length
                product.save({new: true});

                //* Update Category Products Count
                updateProductCount();

                res.status(200).json({ success: true, product });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        case "DELETE":
            try {
                const product = await Product.findById(req.query.id);

                if (!product) {
                    res.status(400).json({
                        success: false,
                        message: "Product not found.",
                    });
                }

                await product.remove();

                //* Update Category Products Count
                updateProductCount();

                res.status(200).json({
                    success: true,
                    message: "Product Delete Successfully.",
                });
            } catch (error) {
                res.status(400).json({
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
};

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
