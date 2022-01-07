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
	Alert
} from "react-native";
import { Component } from "react/cjs/react.production.min";
import { Sound } from "./sound";
import { Audio } from "expo-av";
import { storeData, getData } from "./storage";
import Icon from "react-native-ionicons";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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

	return (
		<View style={styles.container}>
			<View style={styles.countContainer}>
				<Text style={styles.scoreText}>Count: {count}</Text>
				<TouchableOpacity
					style={styles.modalShowButton}
					onPress={() => setModalVis(true)}
				>
					<Entypo name="shop" size={36} color="black" />
					{/* <Text style={styles.modalButton}>Show modal</Text> */}
				</TouchableOpacity>
			</View>

			<View style={styles.modalButton}>
				<Modal
					style={styles.modalButton}
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						// Alert.alert("Modal has been closed");
						setModalVis(!modalVisible);
					}}
				>
					<TouchableOpacity
						style={styles.modalButton}
						onPress={() => setModalVis(!modalVisible)}
					>
						<Text style={styles.modalButton}>Close</Text>
					</TouchableOpacity>

					<View style={styles.duckList}>
						<View style={styles.duckListRow}>
							<View style={styles.duckListImage}>
								<TouchableOpacity>
									<Image source={require("./assets/duck_default.png")}/>
								</TouchableOpacity>
								<TouchableOpacity>
									<Image source={require("./assets/duck_swag_default.png")}/>
								</TouchableOpacity>
							</View>
						</View>
					</View>

				</Modal>
			</View>

			<TouchableWithoutFeedback
				style={styles.button}
				onPress={onPress}
				onPressIn={changeDuck}
				onPressOut={changeDuck}
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
		fontSize: 30,
	},
	duckList: {
		flexDirection: "column"
	},

	duckListRow: {
		flexDirection: "row"
	},
	duckListImage: {
		flexDirection: "column",
		flexShrink: 1,
		flex: -1
	}
	
});

export default Clicker;
