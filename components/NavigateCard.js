import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	return (
		<SafeAreaView style={tw`bg-white flex-1`}>
			<Text style={tw`text-center py-5 text-xl`}>Good Morning, Shourya!🌞</Text>
			<View style={tw`border-t border-gray-200 flex-shrink`}>
				<View>
					<GooglePlacesAutocomplete
						placeholder="Where to?"
						onPress={(data, details = null) =>
							dispatch(
								setDestination({
									location: details.geometry.location,
									description: data.description,
									title: details.address_components[0].long_name,
								}),
								navigation.navigate("RideOptionsCard")
							)
						}
						query={{
							key: GOOGLE_MAPS_APIKEY,
							language: "en",
						}}
						fetchDetails
						styles={toIputBoxStyles}
						textInputProps={{ selectionColor: "#5c5c5c" }}
						enablePoweredByContainer={false}
						minLength={2}
						nearbyPlacesAPI="GooglePlacesSearch"
						debounce={400}
					/>
				</View>
				<NavFavourites />
			</View>
			<View
				style={tw`flex-row justify-evenly py-2 mb-auto border-t border-gray-100`}
			>
				<TouchableOpacity
					onPress={() => navigation.navigate("RideOptionsCard")}
					style={tw`flex flex-row bg-blue-500 w-36 rounded-full py-4 px-4 items-center justify-evenly`}
				>
					<Icon name="car" type="font-awesome" color="white" size={16} />
					<Text style={tw`text-white text-center`}>Ride</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={tw`flex flex-row bg-zinc-100 w-36 rounded-full py-4 px-4 items-center justify-evenly`}
				>
					<Icon
						name="fast-food-outline"
						type="ionicon"
						color="#3B82F6"
						size={16}
					/>
					<Text style={tw`text-[#3B82F6] text-center`}>Eats</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default NavigateCard;

const toIputBoxStyles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingTop: 20,
		flex: 0,
	},
	textInput: {
		backgroundColor: "#F4F4F5",
		borderRadius: 20,
		paddingHorizontal: 20,
		fontSize: 18,
	},
	textInputContainer: {
		paddingHorizontal: 50,
		paddingBottom: 0,
	},
});
