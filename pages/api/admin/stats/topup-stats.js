import dbConnect from "../../../../lib/db-connect";
import Topup from "../../../../models/topup";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import TopupSum from "../../../../utils/topup-sum";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const TopupClass = new TopupSum();

                const alltimeSum = await TopupClass.allTime();
                const todaySum = await TopupClass.today();
                const yearSum = await TopupClass.year();
                const weekSum = await TopupClass.week();

                res.status(200).json({
                    success: true,
                    stats: {
                        alltimeSum,
                        todaySum,
                        // yearSum,
                        // weekSum
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
