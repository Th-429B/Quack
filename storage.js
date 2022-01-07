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

export const getData = async () => {
	try {
		const value = await AsyncStorage.getItem("counter");
		// if (counter !== null) {
		// 	value = parseInt(value);
		// }

        return counter !== null ? parseInt(value) : 0;
	} catch (e) {
        alert('Error: Unable to load score.');
        console.log(e);
	}
};
