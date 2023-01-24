import mongoose from "mongoose";

const isDev = process.env.NODE_ENV !== "production";

const MONGODB_URI = isDev
    ? "mongodb://127.0.0.1/svrt-test"
    : process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

async function dbConnect() {
    // check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1, 2 and 3)
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    mongoose.set("strictQuery", false);
    return mongoose
        .connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("DB Connection Successful");
        });
}

export default dbConnect;
