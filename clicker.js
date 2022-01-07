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
import { FlatList } from "react-native-web";

const Clicker = () => {
	const [count, setCount] = useState(0);

	useEffect(() => {
        getData((count) => setCount(count))
    }, []);


	async function playSound() {
		const sound = new Audio.Sound();
		const status = await sound.loadAsync(require("./assets/quack.mp3"));

		await sound.replayAsync();
	}

	const onPress = () => {
		playSound();
		storeData(count);

		setCount((prevCount) => prevCount + 1);
	};

	const [showDuckQuack, setDuckState] = useState(false);
	const changeDuck = () => {
		setDuckState(showDuckQuack ? false : true);
	};
	const defaultDuck = require("./assets/duck_default.png");
	const defaultDuckQuack = require("./assets/duck_default_quack.png");

	var imgSource = showDuckQuack ? defaultDuckQuack : defaultDuck;

	const [modalVisible, setModalVis] = useState(false);

	return (
		<View style={styles.container}>
			<View style={styles.countContainer}>
				<Text style={styles.scoreText}>Count: {count}</Text>
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
					<Pressable
						style={styles.modalButton}
						onPress={() => setModalVis(!modalVisible)}
					>
						<Text style={styles.modalButton}>Close</Text>
					</Pressable>

					<View style={styles.duckList}>
						<View style={styles.duckListRow}>
							<View style={styles.duckListImage}>
								<TouchableOpacity>
									<Image source={require("./assets/duck_swag_default.png")}/>
								</TouchableOpacity>
							</View>
						</View>
					</View>

				</Modal>
				<Pressable
					style={styles.modalButton}
					onPress={() => setModalVis(true)}
				>
					<Text style={styles.modalButton}>Customise duck</Text>
				</Pressable>
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
		alignItems: "flex-start",
		justifyContent: "flex-start",
		padding: 5,
	},
	scoreText: {
		fontWeight: "bold",
		fontSize: 30,
	},
	modalButton: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#0488d0",
		color: "white",
		fontWeight: "bold",
		fontSize: 30,
	},
	duckList: {
		flexDirection: "column"
	},

	duckListRow: {
		flexDirection: "row"
	}
});

export default Clicker;
