export default class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    cid() {
        if (this.queryStr.cid) {
            this.query = this.query.find({
                category: { _id: this.queryStr.cid },
            });
        }

        return this;
    }

    // For find Orders, Queues, Topups by id.
    searchById() {
        const id = this.queryStr.id
            ? {
                  _id: {
                      $regex: this.queryStr.id,
                      $options: "i",
                  },
              }
            : {};

        this.query = this.query.find({ ...id });
        return this;
    }
    
    // For find Coupon Code.
    searchCoupon() {
        const couponCode = this.queryStr.couponCode
            ? {
                  code: {
                      $regex: this.queryStr.couponCode,
                      $options: "i",
                  },
              }
            : {};

        this.query = this.query.find({ ...couponCode });
        return this;
    }

    findUser() {
        const user = this.queryStr.findUser
            ? {
                  $or: [
                      {
                          username: {
                              $regex: this.queryStr.findUser,
                              $options: "i",
                          },
                      },
                      {
                          email: {
                              $regex: this.queryStr.findUser,
                              $options: "i",
                          },
                      },
                  ],
              }
            : {};

        this.query = this.query.find({ ...user });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        //   Removing some fields for category
        const removeFields = ["cid", "id", "findUser", "couponCode", "page"];

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
