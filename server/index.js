import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import locationRoute from "./Routes/location.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to DB!"))
	.catch((err) => {
		console.error(err);
	});

app.use("/api/location", locationRoute);

app.listen(4000, () => {
	console.log("Server listening on port 4000");
});