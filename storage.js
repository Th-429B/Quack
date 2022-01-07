import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (counter) => {
	try {
		await AsyncStorage.setItem("counter", counter.toString());
        // console.log(counter);
	} catch (e) {
        alert('Error: Unable to save score.');
        console.log(e);
	}
};

export const getData = async (setState) => {
	try {
		const value = await AsyncStorage.getItem("counter");

        return value !== null ? setState(parseInt(value) + 1) : setState(0);
	} catch (e) {
        alert('Error: Unable to load score.');
        console.log(e);
	}
};
