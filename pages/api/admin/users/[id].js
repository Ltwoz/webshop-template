import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import User from "../../../../models/user";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const user = await User.findById(req.query.id);

                res.status(200).json({ success: true, user });
            } catch (error) {
                res.status(404).json({
                    success: false,
                    message: `User doesn't exist with Id: ${req.query.id}`,
                });
            }
            break;
        case "PUT":
            try {
                const newUserData = {
                    // username: req.body.username,
                    // email: req.body.email,
                    role: req.body?.role,
                    point: req.body?.point
                }

                const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: true
                });

                res.status(200).json({success: true, user});
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        // case "DELETE":
        //     try {
        //         const user = await User.findById(req.query.id);

        //         if (!user) {
        //             res.status(400).json({
        //                 success: false,
        //                 message: "User not found.",
        //             });
        //         }

        //         await user.remove();

        //         res.status(200).json({
        //             success: true,
        //             message: "User Delete Successfully.",
        //         });
        //     } catch (error) {
        //         res.status(400).json({
        //             success: false,
        //             message: error.message,
        //         });
        //     }
        //     break;
        default:
            res.status(405).json({
                success: false,
                message: "Method not allowed.",
            });
            break;
    }
};

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
