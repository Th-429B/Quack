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
import { Audio } from "expo-av";
import { storeData, getData } from "./storage";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

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
				</TouchableOpacity>
			</View>

			<View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						// Alert.alert("Modal has been closed");
						setModalVis(!modalVisible);
					}}
				>
					<TouchableOpacity
						style={styles.modalCloseButton}
						onPress={() => setModalVis(!modalVisible)}
					>
						<AntDesign name="closecircle" size={36} color="black" />
					</TouchableOpacity>

					<View style={styles.duckList}>
						<View style={styles.duckListRow}>
							<View style={styles.duckListImage}>
								<View style={styles.duckListCell}>
									<TouchableOpacity>
										<Image style={styles.duckSize} source={require("./assets/duck_default_shrink.png")}/>
									</TouchableOpacity>
									{/* <TouchableOpacity>
										<Image style={styles.duckSize} source={require("./assets/duck_swag_default.png")}/>
									</TouchableOpacity> */}
								</View>
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
	},
	modalCloseButton: {
		alignItems: "flex-end",
		justifyContent: "space-between",
		backgroundColor: "white",
		color: "white",
		padding: 30,
		fontWeight: "bold",
	},
	duckList: {
		flexDirection: "column",
		backgroundColor: "white"
	},

	duckListRow: {
		flexDirection: "row"
	},
	duckListImage: {
		flexDirection: "row",
		flexShrink: 1,
		
	},
	duckListCell: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	duckyduckyducky: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "contain"
	},
	duckSize: {
		height: "70%",
		width:200
	}
	
});

export default Clicker;
