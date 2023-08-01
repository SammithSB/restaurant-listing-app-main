/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
	MapContainer,
	Popup,
	Marker,
	TileLayer,
	Circle,
	CircleMarker,
} from "react-leaflet";
import axios from "axios";
import { Icon } from "leaflet";

const Map = ({ previousLocations, userLocation, radius }) => {
	const [restaurants, setRestaurants] = useState([]);

	const recentIcon = new Icon({
		iconUrl: "/src/assets/clock-counter-clockwise.svg",
		iconSize: [24, 24],
	});

	useEffect(() => {
		const fetchRestaurants = async () => {
			const response = await axios.get(
				`https://api.foursquare.com/v3/places/search?v=20230801&ll=${
					userLocation.latitude
				},${userLocation.longitude}&query=restaurant&radius=${
					radius * 1000
				}&limit=50`,
				{
					headers: {
						Authorization: `${import.meta.env.VITE_FOURSQUARE_API_KEY}`,
					},
				}
			);
			if (response.status === 200) {
				setRestaurants(response.data.results);
			} else {
				alert("Something went wrong");
			}
		};

		fetchRestaurants();
	}, [userLocation.latitude, userLocation.longitude, radius]);

	return (
		<>
			<MapContainer
				className="w-full h-[90vh]"
				center={[userLocation.latitude, userLocation.longitude]}
				zoom={13}
				scrollWheelZoom={true}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Circle
					center={[userLocation.latitude, userLocation.longitude]}
					pathOptions={{ fillColor: "blue" }}
					radius={radius * 1000}
				/>

				<CircleMarker
					pathOptions={{ color: "red" }}
					center={[userLocation.latitude, userLocation.longitude]}
				>
					<Popup>
						<h1 className="text-md font-bold">Current Location</h1>
					</Popup>
				</CircleMarker>

				{/* render only from the 1st item in the array */}
				{previousLocations.length > 1 &&
					previousLocations.map((location, index) => (
						<Marker
							key={index}
							icon={recentIcon}
							position={[location.latitude, location.longitude]}
						>
							{location.latitude === userLocation.latitude &&
							location.longitude === userLocation.longitude ? null : (
								<Popup>
									<h2 className="text-md font-semibold">Previous Location</h2>
								</Popup>
							)}
						</Marker>
					))}

				{restaurants?.map((restaurant) => (
					<Marker
						key={restaurant.fsq_id}
						position={[
							restaurant.geocodes.main.latitude,
							restaurant.geocodes.main.longitude,
						]}
					>
						<Popup>
							<h2 className="text-md font-semibold">{restaurant.name}</h2>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</>
	);
};

export default Map;
