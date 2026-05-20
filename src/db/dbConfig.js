import mongoose from "mongoose";
import { DB_NAME } from "../constants/index.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        const currentDate = new Date().toLocaleString();
        const dbInfo = {
            "✅ STATUS": "Connected",
            "📡 HOST": connectionInstance.connection.host,
            "⏰ DATE_TIME": currentDate,
        };

        console.log("\n🚀 MongoDB Connection Established");
        console.table(dbInfo);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connectDB;