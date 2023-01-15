import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Product from "../../../../models/product";

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

                console.log(stock);

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

                // //* If req.body.stock is array use concat instead of push
                // if (Array.isArray(stock)) {
                //     product.stock = product.stock.concat(stock);
                // } else {
                //     product.stock.push(stock);
                // }

                product.stock = stock

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
