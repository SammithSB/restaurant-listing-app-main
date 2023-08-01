import { useState, useEffect } from "react";
import Map from "./components/Map";
import axios from "axios";

function App() {
	const [radius, setRadius] = useState(20);
	const [previousLocations, setPreviousLocations] = useState([
		{ latitude: "12.9573", longitude: "77.9956" },
		// { latitude: "12.9922974", longitude: "77.5781866" },
		// { latitude: "12.8896974", longitude: "77.5574752" },
	]);
	const [userLocation, setUserLocation] = useState({
		latitude: "12.96",
		longitude: "77.57",
	});

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					setUserLocation({ latitude, longitude });

					const response = await axios.get(
						"http://localhost:5000/api/location/"
					);
					const locationStored = response.data;
					//check if the location is already present in the database
					if (
						!locationStored.some(
							(location) =>
								location.latitude === latitude &&
								location.longitude === longitude
						) &&
						locationStored.length <= 10
					) {
						const response = await axios.post(
							"http://localhost:5000/api/location/",
							{
								latitude: latitude,
								longitude: longitude,
							}
						);
						console.log(response);
						// update previous locations array
						setPreviousLocations([
							...previousLocations,
							{
								latitude: latitude,
								longitude: longitude,
							},
						]);
					} else {
						setPreviousLocations(locationStored);
					}
				},
				(error) => {
					console.error("Error getting location:", error.message);
					alert("Error getting location");
				},
				{ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
			);
		} else {
			console.error("Geolocation is not available in this browser.");
			alert("Geolocation is not available in this browser.");
		}
	}, []);

	return (
		<>
			<h1>Restaurant Listing App</h1>
			<nav>
				<ul>
					<li>
						<p>Search Radius: {radius} Kilometers</p>
						<input
							type="range"
							min={1}
							max={100}
							value={radius}
							onChange={(event) => setRadius(event.target.value)}
							name="radius"
							id="radius"
						/>
					</li>
				</ul>
			</nav>
			{userLocation && (
				<Map
					previousLocations={previousLocations}
					userLocation={userLocation}
					radius={radius}
				/>
			)}
		</>
	);
}

export default App;