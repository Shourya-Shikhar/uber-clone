import {
	StyleSheet,
	View,
	SafeAreaView,
	TouchableOpacity,
	FlatList,
	Text,
	Image,
} from "react-native";
// import {  } from "native-base";
import React, { useState } from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { selectTravelTimeInformation } from "../slices/navSlice";
import { useSelector } from "react-redux";

const data = [
	{
		id: "Uber-X-123",
		title: "UberX",
		multiplier: 1,
		image: "https://links.papareact.com/3pn",
	},
	{
		id: "Uber-XL-456",
		title: "UberXL",
		multiplier: 1.25,
		image: "https://links.papareact.com/5w8",
	},
	{
		id: "Uber-LUX-789",
		title: "Uber LUX",
		multiplier: 1.75,
		image: "https://links.papareact.com/7pf",
	},
];

const RideOptionsCard = () => {
	const navigation = useNavigation();
	const [selected, setSelected] = useState(null);
	const travelTimeInformation = useSelector(selectTravelTimeInformation);

	const SURGE_CHARGE_RATE = 1.5;

	return (
		<SafeAreaView>
			<View>
				<TouchableOpacity
					onPress={() => navigation.navigate("NavigateCard")}
					style={tw`absolute top-3 left-5 z-2 p-3 rounded-full`}
				>
					<Icon name="chevron-left" type="fontawesome" />
				</TouchableOpacity>
				<Text style={tw`text-center py-5 text-xl`}>
					Select a ride - {travelTimeInformation?.distance?.text}
				</Text>
			</View>
			<FlatList
				style={tw`h-auto max-h-60`}
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item: { id, title, multiplier, image }, item }) => (
					<TouchableOpacity
						onPress={() => setSelected(item)}
						style={tw`flex-row justify-between items-center px-10 ${
							id === selected?.id && "bg-blue-400"
						}`}
					>
						<Image
							style={{ width: 100, height: 100, resizeMode: "contain" }}
							source={{ uri: image }}
						/>
						<View style={tw`-ml-4`}>
							<Text style={tw`text-xl font-bold`}>{title}</Text>
							<Text>
								{travelTimeInformation?.duration?.text}
							</Text>
						</View>
						<Text style={tw`text-xl font-semibold`}>
							{/* {new Intl} */}
							{/* {new Intl.NumberFormat( */}
							{/* // 'en-IN', { style:'currency',currency:'INR',maximumSignificantDigits:3 }
								// "ja-JP",
								// { style: "currency", currency: "JPY" }
							).format( */}
							&#8377;{" "}
							{Math.trunc(
								(travelTimeInformation?.duration?.value *
									SURGE_CHARGE_RATE *
									multiplier) /
									100
							)}
							{/* )} */}
						</Text>
					</TouchableOpacity>
				)}
			/>
			<View>
				<TouchableOpacity
					disabled={!selected}
					style={tw`bg-blue-400 rounded-full py-3 m-3 ${
						!selected && "bg-gray-100"
					}`}
				>
					<Text style={tw`text-center text-xl text-white`}>
						Choose {selected?.title}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
