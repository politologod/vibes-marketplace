import Mongoose from "mongoose";
import { config } from "dotenv";

config();

const databaseURL = process.env.DATABASE_URL;

Mongoose.connect(databaseURL)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {

        console.error("Error connecting to database", error);
    });

export default Mongoose;