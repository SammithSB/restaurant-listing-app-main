
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

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

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(5000, () => {
	console.log("Server listening on port 5000");
});