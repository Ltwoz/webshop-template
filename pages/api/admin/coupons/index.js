import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Coupon from "../../../../models/coupon";
import ApiFeatures from "../../../../utils/api-features";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const resultPerPage = 20;

                const apiFeature = new ApiFeatures(
                    Coupon.find(),
                    req.query
                )
                    .filter()
                    .searchCoupon();

                let coupons = await apiFeature.query;

                let fiteredCouponsCount = coupons.length;

                apiFeature.pagination(resultPerPage);

                coupons = await apiFeature.query.clone();

                const totalPageCount = Math.ceil(
                    fiteredCouponsCount / resultPerPage
                );

                res.status(200).json({
                    success: true,
                    coupons,
                    fiteredCouponsCount,
                    totalPageCount,
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
};

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
