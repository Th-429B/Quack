import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback } from "react-native";
import { Audio } from 'expo-av';


const Clicker = () => {
  const [count, setCount] = useState(0);

  const onPress = () => {
      setCount(prevCount => prevCount + 1);}


  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text>Count: {count}</Text>
      </View>
      <TouchableWithoutFeedback
        style={styles.button}
        onPress={onPress}
      >
        <Image source={require('./assets/duck_default.png')}/>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});

export default Clicker;