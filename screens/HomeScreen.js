import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import uberLogo from "../assets/uberLogo.png";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import NavOptions from "../components/NavOptions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView
			style={{
				paddingTop: Constants.statusBarHeight,
				backgroundColor: "#fff",
				// width: "100%",
				height: "100%",
			}}
		>
			<StatusBar style="dark" />
			<View style={tw`p-5`}>
				<Image
					source={{ uri: "https:/links.papareact.com/gzs" }}
					// source={uberLogo}
					style={{
						width: 100,
						height: 100,
						resizeMode: "contain",
					}}
				/>
				<GooglePlacesAutocomplete
					placeholder="Where from?"
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
								title: details.address_components[0].long_name,
							})
						);
					}}
					fetchDetails={true}
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: "en",
					}}
					styles={{
						container: {
							flex: 0,
							zIndex: 2,
						},
						textInput: {
							fontSize: 18,
						},
					}}
					textInputProps={{ selectionColor: "#5c5c5c" }}
					enablePoweredByContainer={false}
					minLength={2}
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={400}
				/>
				<NavOptions />
				<NavFavourites />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
