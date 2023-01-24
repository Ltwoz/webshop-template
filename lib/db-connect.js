import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

let db;

async function dbConnect() {
    // check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1, 2 and 3)
    // if (mongoose.connection.readyState >= 1) {
    //     return;
    // }

    // mongoose.set("strictQuery", false);
    // return mongoose
    //     .connect(MONGODB_URI, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     })
    //     .then(() => {
    //         console.log("DB Connection Successful");
    //     });
    
    if (db) {
        return db;
    }

    db = await mongoose
        .connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("DB Connection Successful");
        });

    return db;
}

export default dbConnect;
