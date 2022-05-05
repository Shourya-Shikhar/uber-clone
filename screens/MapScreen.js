import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import Constants from "expo-constants";
import Map from "../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import NavFavourites from "../components/NavFavourites";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
	const Stack = createNativeStackNavigator();
	const navigation = useNavigation();
	return (
		<SafeAreaView
			style={{
				paddingTop: Constants.statusBarHeight + 10,
				backgroundColor: "transparent",
				// width: "100%",
				height: "100%",
			}}
		>
			<View>
				<TouchableOpacity
					style={tw`absolute top-14 left-2 bg-gray-100 z-50 p-3 rounded-full shadow-lg`}
					onPress={() => navigation.navigate("Home")}
				>
					<Icon name="menu" />
				</TouchableOpacity>
			</View>
			<View style={tw`h-1/2`}>
				<Map />
			</View>
			<View style={tw`h-1/2`}>
				<Stack.Navigator>
					<Stack.Screen
						name="NavigateCard"
						component={NavigateCard}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="RideOptionsCard"
						component={RideOptionsCard}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</View>
			<NavFavourites />
		</SafeAreaView>
	);
};

export default MapScreen;
