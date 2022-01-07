import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeCoins = async (counter) => {
	try {
		await AsyncStorage.setItem("counter", counter.toString());
        // console.log(counter);
	} catch (e) {
        alert('Error: Unable to save score.');
        console.log(e);
	}
};

export const loadCoins = async (setState) => {
	try {
		const value = await AsyncStorage.getItem("counter");

        return value !== null ? setState(parseInt(value) + 1) : setState(0);
	} catch (e) {
        alert('Error: Unable to load score.');
        console.log(e);
	}
};

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

export const saveDuckPurchased = async (ducksPurchased) => {
	try {
        // console.log(ducksPurchased);
        const jsonValue = JSON.stringify(ducksPurchased);
        // console.log(jsonValue);
		await AsyncStorage.setItem('@duck_purchased', jsonValue);
	} catch (e) {
        alert('Error: Unable to save score.');
        console.log(e);
	}
};

export const loadDuckPurchased = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem('@duck_purchased');
        console.log(jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
        alert('Error: Unable to save score.');
        console.log(e);
	}
};
