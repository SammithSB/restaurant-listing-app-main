import LocationHistory from "../Model/LocationHistory.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
	try {
		const locationHistory = await LocationHistory.find();
		res.status(200).json(locationHistory);
	} catch (err) {
		res.json({ message: err });
	}
});

router.post("/", async (req, res) => {
	const locationHistory = new LocationHistory({
		latitude: req.body.latitude,
		longitude: req.body.longitude,
	});

	try {
		const savedLocationHistory = await locationHistory.save();
		res.status(200).json(savedLocationHistory);
	} catch (err) {
    console.log(err)
		res.json({ message: err });
	}
});

export default router;