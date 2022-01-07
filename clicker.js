import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	TouchableWithoutFeedback,
	Modal,
	Pressable,
	Alert,
	Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import { storeCoins, loadCoins, saveDuckPurchased, loadDuckPurchased } from "./storage";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const deviceWidth = Dimensions.get('window').width;

const variants = {
	default: {
		base: require("./assets/ducks/duck_default.png"),
		quack: require("./assets/ducks/duck_default_quack.png"),
		unlocked: true
	},
	swag: {
		base: require("./assets/ducks/duck_swag_default.png"),
		quack: require("./assets/ducks/duck_swag_quack.png"),
		unlocked: false
	},
	devil: {
		base: require("./assets/ducks/duck_devil_default.png"),
		quack: require("./assets/ducks/duck_devil_quack.png"),
		unlocked: false
	},
	angel: {
		base: require("./assets/ducks/duck_angel_default.png"),
		quack: require("./assets/ducks/duck_angel_quack.png"),
		unlocked: false
	}
};

// const test = loadDuckPurchased();
// console.log(test);

// let ducksPurchased = loadDuckPurchased();

let currentDuck = variants.default.base;
let currentDuckQuack = variants.default.quack;

const Clicker = () => {

	const [count, setCount] = useState(0);
	const [bool, setBool] = useState();

	// to load the previous count
	useEffect(() => {
        loadCoins((count) => setCount(count));
		loadDuckPurchased((arr) => setBool(arr)).then((bool) => console.log(bool));
		// loadDucks();
    }, []);

	const loadDucks = () => {
		console.log("did i get called?")
		variants["swag"].unlocked = bool[1];
		variants["devil"].unlocked = bool[2];
		variants["angel"].unlocked = bool[3];
		console.log(variants["swag"].unlocked);
	}

	// to play duck sound on click
	async function playSound() {
		const sound = new Audio.Sound();
		const status = await sound.loadAsync(require("./assets/quack.mp3"));

		await sound.replayAsync();
	}

	// on press duck handler
	const onPress = () => {
		playSound();
		storeCoins(count);
		setCount((prevCount) => prevCount + 1);
	};

	// change duck image
	const [showDuckQuack, setDuckState] = useState(false);
	const duckQuack = () => {
		setDuckState(showDuckQuack ? false : true);
	};

	var imgSource = showDuckQuack ? currentDuckQuack : currentDuck;

	// modal here
	const [modalVisible, setModalVis] = useState(false);

	// handle shop press
	const modalVariantPress = (value, duckName) => {
		let successfulPurchase;
		// if (variants[duckName].unlocked == false) {
		if (bool[duckName] == false) {
			successfulPurchase = buyDuck(value);
			// variants[duckName].unlocked = successfulPurchase;
			bool[duckName] = successfulPurchase;
			// change code here
			saveDuckPurchased(bool);
		}
		if (successfulPurchase || bool[duckName] == true) {
			changeDuck(duckName);
			// Alert.alert("Duck changed to " + duckName)
		}
		
	}
	// let test = [true, false, false, false]

	// functionality for duck purchase
	const buyDuck = (value) => {
		if (count >= value) {
			var newValue = count - value;
			setCount(newValue);
			storeCoins(newValue);
			Alert.alert("Bought Duck!");
			// saveDuckPurchased(test);

			return true;
		} else {
			Alert.alert("Not enough money!");
		}

		return false;
	}

	// change main duck
	const changeDuck = (duckName) => {
		switch (duckName) {
			case "default":
				currentDuck = variants.default.base;
				currentDuckQuack = variants.default.quack;
				break;
			case "swag":
				currentDuck = variants.swag.base;
				currentDuckQuack = variants.swag.quack;
				break;
			case "devil":
				currentDuck = variants.devil.base;
				currentDuckQuack = variants.devil.quack;
				break;
			case "angel":
				currentDuck = variants.angel.base;
				currentDuckQuack = variants.angel.quack;
				break;
		}
		setModalVis(false);
	}
	
	// modal dynamic styling
	const styleModal = (duckName) => {
		return variants[duckName].unlocked ? 1 : 0.5;
	}

	return (
		<View style={styles.container}>
			<View style={styles.countContainer}>
				<Text style={styles.scoreText}>Coins: {count}</Text>
				<TouchableOpacity
					style={styles.modalShowButton}
					onPress={() => setModalVis(true)}
				>
					<Entypo name="shop" size={36} color="black" />
				</TouchableOpacity>
			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					// Alert.alert("Modal has been closed");
					setModalVis(!modalVisible);
				}}
			>
				<View style={styles.shopContainer}>
					<View style={styles.shopHeader}>
						<Text style={{ fontSize: 30, fontWeight: "bold" }}>
							Shop
						</Text>

						<TouchableOpacity
							onPress={() => setModalVis(!modalVisible)}
						>
							<AntDesign
								name="closecircle"
								size={36}
								color="black"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.modalContainer}>
						<View style={styles.modalCell}>
							<TouchableOpacity onPress={() => {
								changeDuck("default");
							}}>
								<Image source={variants.default.base} style={[styles.modalImg, {tintColor: "black"}]} resizeMode="contain"/>
								<Image source={variants.default.base} style={[styles.modalImg, {position: "absolute", opacity: styleModal("default")}]} resizeMode="contain"/>
								<Text></Text>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => modalVariantPress(10, 1)}>
								<Image source={variants.swag.base} style={[styles.modalImg, {tintColor: "black"}]} resizeMode="contain"/>
								<Image source={variants.swag.base} style={[styles.modalImg, {position: "absolute", opacity: styleModal("swag")}]} resizeMode="contain"/>
								<Text>10</Text>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => modalVariantPress(50, 2)}>
								<Image source={variants.devil.base} style={[styles.modalImg, {tintColor: "black"}]} resizeMode="contain"/>
								<Image source={variants.devil.base} style={[styles.modalImg, {position: "absolute", opacity: styleModal("devil")}]} resizeMode="contain"/>
								<Text>50</Text>
							</TouchableOpacity>
							
							<TouchableOpacity onPress={() => modalVariantPress(100, 3)}>
								<Image source={variants.angel.base} style={[styles.modalImg, {tintColor: "black"}]} resizeMode="contain"/>
								<Image source={variants.angel.base} style={[styles.modalImg, {position: "absolute", opacity: styleModal("angel")}]} resizeMode="contain"/>
								<Text>100</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			<TouchableWithoutFeedback
				style={styles.button}
				onPress={onPress}
				onPressIn={duckQuack}
				onPressOut={duckQuack}
			>
				<Image source={imgSource} />
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// flexDirection: "column",
		// justifyContent: "center",
		// paddingHorizontal: 10
	},
	button: {
		flex: 2,
		alignItems: "center",
		backgroundColor: "#DDDDDD",
		padding: 10,
	},
	countContainer: {
		flex: 0.7,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		padding: 5,
	},
	scoreText: {
		fontWeight: "bold",
		fontSize: 30,
	},
	modalShowButton: {
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "white",
		color: "white",
		padding: 0,
		fontWeight: "bold",
	},
	modalCloseButton: {
		alignItems: "flex-end",
		justifyContent: "space-between",
		backgroundColor: "white",
		color: "white",
		padding: 30,
		fontWeight: "bold",
	},
	shopContainer: {
		flex: 1,
		flexDirection: "column",
		borderColor: "black",
		borderStyle: "solid",
	},
	shopHeader: {
		flex: 0.5,
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "white",
		padding: 30,
	},

	modalContainer: {
		flex: 9,
		backgroundColor: "white",
	},
	modalCell: {
		flexDirection: "row",
		flexWrap: "wrap",
		overflow: "scroll",
		alignItems: "center",
		position: "relative",
		margin: 10,
	},
	modalImg: {
		width: deviceWidth / 2 - 10,
		height: deviceWidth / 2 - 10,
	},
	duckPrice: {
		alignSelf: "center",
		fontSize: 30,
		fontWeight: "bold",
	}
});

export default Clicker;
