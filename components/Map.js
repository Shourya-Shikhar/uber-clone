import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
	selectOrigin,
	selectDestination,
	setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!origin || !destination) return;

		// Zoom and fit the markers
		mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
			edgePadding: { top: 100, right: 50, left: 50, bottom: 100 },
		});
	}, [origin, destination]);

	useEffect(() => {
		if (!origin || !destination) return;

		const getTravelTime = async () => {
			const URL = `https://maps.googleapis.com/maps/api/distancematrix/json
			?destinations=${destination.description}
			&origins=${origin.description}
			&units=imperial
			&key=${GOOGLE_MAPS_APIKEY}`;
			await fetch(URL)
				.then((res) => res.json())
				.then((data) => {
					dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
				});
		};
		getTravelTime();
	}, [origin, destination, GOOGLE_MAPS_APIKEY]);

	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			}}
		>
			{origin && destination && (
				<MapViewDirections
					origin={origin.description}
					destination={destination.description}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={3}
					strokeColor="black"
				/>
			)}

			{origin?.location && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title={origin.title}
					description={origin.description}
					identifier="origin"
				/>
			)}
			{destination?.location && (
				<Marker
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					}}
					title={destination.title}
					description={destination.description}
					identifier="destination"
				/>
			)}
		</MapView>
	);
};

export default Map;

const styles = StyleSheet.create({});
