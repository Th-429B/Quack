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

const test = [true, false, false, false]

export const saveDuckPurchased = async (ducksPurchased) => {
	try {
        console.log(ducksPurchased);
        const jsonValue = JSON.stringify(ducksPurchased);
        // console.log(jsonValue);
		await AsyncStorage.setItem('@duck_purchased', jsonValue);
	} catch (e) {
        alert('Error: Unable to save score.');
        console.log(e);
	}
};

export const loadDuckPurchased = async (setState) => {
	try {
		const jsonValue = await AsyncStorage.getItem('@duck_purchased');
        console.log(jsonValue);
        const arr =  jsonValue != null ? JSON.parse(jsonValue) : null;
        // console.log(arr);
        setState(arr);
        return arr;
	} catch (e) {
        alert('Error: Unable to load ducks purchased.');
        console.log(e);
	}
};
