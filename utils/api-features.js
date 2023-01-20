import Category from "../models/category";

export default class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    cid() {
        if (this.queryStr.cid) {
            this.query = this.query
                .find({ category: this.queryStr.cid })
                .populate({
                    path: "category",
                    model: Category,
                });
        }

        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        //   Removing some fields for category
        const removeFields = ["cid"];

        removeFields.forEach((key) => delete queryCopy[key]);

        let queryStr = JSON.stringify(queryCopy);

        this.query = this.query
            .find(JSON.parse(queryStr))
            .sort({ createdAt: -1 });

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}
