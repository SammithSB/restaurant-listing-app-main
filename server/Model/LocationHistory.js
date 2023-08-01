import mongoose from "mongoose";

const LocationHistorySchema = new mongoose.Schema(
	{
		latitude: {
			type: String,
			required: true,
		},
		longitude: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("LocationHistory", LocationHistorySchema);