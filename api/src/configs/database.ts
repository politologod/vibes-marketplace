import mongoose from "mongoose";
import { config } from "dotenv";

config();

const databaseURL = process.env.DATABASE_URL;

const connection = async () => {
if(!databaseURL) {
    throw new Error("DATABASE_URL is not defined, you need to set it in the .env file");
}


await mongoose.connect(databaseURL!)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {

        console.error("Error connecting to database", error);
    });
}

export default connection;
