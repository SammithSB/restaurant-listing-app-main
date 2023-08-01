import { useState, useEffect } from "react";
import Map from "./components/Map";

function App() {
	const [radius, setRadius] = useState(20);
	const [previousLocations, setPreviousLocations] = useState([
		{ latitude: "12.9737507", longitude: "77.5077853" },
		{ latitude: "12.9922974", longitude: "77.5781866" },
		{ latitude: "12.8896974", longitude: "77.5574752" },
	]);
	const [userLocation, setUserLocation] = useState({
		latitude: "12.96",
		longitude: "77.57",
	});

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setUserLocation({ latitude, longitude });
					// if local storage contains previous locations array, get the array and add the new location to it
					// else, create a new array with the new location
					if (localStorage.getItem("previousLocations")) {
						const previousLocations = JSON.parse(
							localStorage.getItem("previousLocations")
						);

						// push only if the location is not already present in the array and check for only until two decimal places and array length is less than or equal to 10
						if (
							!previousLocations.some(
								(location) =>
									location.latitude === latitude &&
									location.longitude === longitude
							) &&
							previousLocations.length <= 10
						) {
							previousLocations.push({
								latitude: latitude,
								longitude: longitude,
							});
							setPreviousLocations(previousLocations);
							localStorage.setItem(
								"previousLocations",
								JSON.stringify(previousLocations)
							);
						}
					} else {
						// latitude and longitude should be rounded to two decimal places
						const newPreviousLocations = [
							{
								latitude: latitude,
								longitude: longitude,
							},
							...previousLocations,
						];
						setPreviousLocations(newPreviousLocations);
						localStorage.setItem(
							"previousLocations",
							JSON.stringify(previousLocations)
						);
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
	}, [previousLocations]);

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
