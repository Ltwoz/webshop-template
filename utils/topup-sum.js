import Topup from "../models/topup";
import dayjs from "dayjs";

export default class TopupSum {
    constructor(year, month, day) {}

    async allTime() {
        const sum = await Topup.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" },
                },
            },
        ]);
        return sum.length > 0 ? sum[0].totalAmount : 0;
    }

    async today() {
        const todayStart = dayjs().startOf("day").toDate();
        const todayEnd = dayjs().endOf("day").toDate();

        const sum = await Topup.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: todayStart,
                        $lt: todayEnd,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" },
                },
            },
        ]);
        return sum.length > 0 ? sum[0].totalAmount : 0;
    }

    async year() {
        const year = new Date().getFullYear();
        const start = new Date(`${year}-01-01`);
        const end = new Date(`${year + 1}-01-01`);

        const results = await Topup.aggregate([
            {
                $match: {
                    createdAt: { $gte: start, $lt: end },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m", date: "$createdAt" },
                    },
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]).exec();

        const monthNumbers = Array.from({ length: 12 }, (_, i) => i + 1);
        const sumOfAmountPerMonth = monthNumbers.map((monthNumber) => {
            const monthStr = `${year}-${String(monthNumber).padStart(2, "0")}`;
            const monthResult = results.find(
                (result) => result._id === monthStr
            );
            return monthResult ? monthResult.totalAmount : 0;
        });

        return sumOfAmountPerMonth;
    }

    async month() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const start = new Date(`${year}-${month}-01`);
        const end = new Date(`${year}-${month + 1}-01`);

        const results = await Topup.aggregate([
            {
                $match: {
                    createdAt: { $gte: start, $lt: end },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                        },
                    },
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);

        const daysInMonth = new Date(year, month, 0).getDate();
        const sumOfAmountPerDay = Array.from(
            { length: daysInMonth },
            (_, i) => {
                const dayStr = `${year}-${String(month).padStart(
                    2,
                    "0"
                )}-${String(i + 1).padStart(2, "0")}`;
                const dayResult = results.find(
                    (result) => result._id === dayStr
                );
                return dayResult ? dayResult.totalAmount : 0;
            }
        );

        return sumOfAmountPerDay;
    }

    async week() {
        const now = dayjs();
        const startOfWeek = now.startOf('week');
        const endOfWeek = now.endOf('week');

        const results = await Topup.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfWeek.toDate(), $lt: endOfWeek.toDate() },
                },
            },
            {
                $group: {
                    _id: {
                        $dayOfWeek: "$createdAt",
                    },
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);

        const sumOfAmountPerDay = Array.from({ length: 7 }, (_, i) => {
            const date = startOfWeek.add(i, 'day').toDate();
            const dayResult = results.find((result) => result._id === dayjs(date).day());
            return { date, totalAmount: dayResult ? dayResult.totalAmount : 0 };
        });

        return sumOfAmountPerDay;
    }
}
