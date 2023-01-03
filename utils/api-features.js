export default class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    filter() {
        const queryCopy = {...this.queryStr};
        
        //   Removing some fields for category
        // const removeFields = ["keyword", "page", "limit"];

        // removeFields.forEach((key) => delete queryCopy[key]);

        let queryStr = JSON.stringify(queryCopy);

        this.query = this.query.find(JSON.parse(queryStr))

        return this
    }
}