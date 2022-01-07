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
	Dimensions
} from "react-native";
import { Audio } from "expo-av";
import { storeData, getData } from "./storage";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const variants = [
	{name: "default", base: require("./assets/duck_default.png"), quack: require("./assets/duck_default_quack.png")},
	{name: "swag", base: require("./assets/duck_swag_default.png"), quack: require("./assets/duck_swag_quack.png")},
	{name: "devil", base: require("./assets/duck_devil_default.png"), quack: require("./assets/duck_devil_quack.png")},
	{name: "angel", base: require("./assets/duck_angel_default.png"), quack: require("./assets/duck_angel_quack.png")}
]

const deviceWidth = Dimensions.get('window').width;

const Clicker = () => {
	const [count, setCount] = useState(0);

	// to load the previous count
	useEffect(() => {
        getData((count) => setCount(count))
    }, []);


	// to play duck sound on click
	async function playSound() {
		const sound = new Audio.Sound();
		const status = await sound.loadAsync(require("./assets/quack.mp3"));

		await sound.replayAsync();
	}

	// on press duck handler
	const onPress = () => {
		playSound();
		storeData(count);

		setCount((prevCount) => prevCount + 1);
	};

	// change duck image
	const [showDuckQuack, setDuckState] = useState(false);
	const changeDuck = () => {
		setDuckState(showDuckQuack ? false : true);
	};
	const defaultDuck = require("./assets/duck_default.png");
	const defaultDuckQuack = require("./assets/duck_default_quack.png");

	var imgSource = showDuckQuack ? defaultDuckQuack : defaultDuck;

	// modal here
	const [modalVisible, setModalVis] = useState(false);

	// functionality for shop
	const buyDuck = (value) => {
		if (count >= value) {
			setCount(count - value);
			Alert.alert("Bought Duck!")
		} else {
			Alert.alert("Not enough money!")
		}
	} 

	return (
		<View style={styles.container}>
			<View style={styles.countContainer}>
				<Text style={styles.scoreText}>Count: {count}</Text>
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
						
						
						<Text style={{ fontSize: 30 ,fontWeight: "bold" }}>Shop</Text>
						
						<TouchableOpacity
							onPress={() => setModalVis(!modalVisible)}
						>
							<AntDesign name="closecircle" size={36} color="black" />
						</TouchableOpacity>
					</View>
					<View style={styles.modalContainer}>
						<View style={styles.modalCell}>
							<TouchableOpacity onPress={() => buyDuck(10)}>
								<Image source={require("./assets/duck_swag_default.png")} style={styles.modalImg} resizeMode="contain"/>
								<Text>10</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => buyDuck(50)}>
								<Image source={require("./assets/duck_swag_default.png")} style={styles.modalImg} resizeMode="contain"/>
								<Text>50</Text>
							</TouchableOpacity>
							
							<TouchableOpacity onPress={() => buyDuck(100)} >
								<Image source={require("./assets/duck_swag_default.png")} style={styles.modalImg} resizeMode="contain"/>
								<Text>100</Text>
							</TouchableOpacity>
						</View>
					</View>

				</View>
			</Modal>

			<TouchableWithoutFeedback
				style={styles.button}
				onPress={onPress}
				onPressIn={changeDuck}
				onPressOut={changeDuck}
			>
				<Image source={imgSource}/>
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
		padding: 30
	},

	modalContainer: {
		flex: 9,
		backgroundColor: "white"
	},
	modalCell: {
		flexDirection: "row",
		flexWrap: "wrap",
		overflow: "scroll",
		alignItems: "center",
		position: 'relative',
		margin: 10
	},
	modalImg: {
		width: deviceWidth/2 - 10,
		height: deviceWidth/2 - 10
	}
	
});

export default Clicker;
