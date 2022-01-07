import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback } from "react-native";
import { Component } from "react/cjs/react.production.min";

const Clicker = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  const [showDuckQuack, setDuckState] = useState(false);
  const changeDuck = () => {
    setDuckState(showDuckQuack ? false : true);
    // showDuckQuack ? defaultDuck : defaultDuckQuack;
  }
  const defaultDuck = require("./assets/duck_default.png");
  const defaultDuckQuack = require("./assets/duck_default_quack.png");

  var imgSource = showDuckQuack ? defaultDuckQuack : defaultDuck;

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text>Count: {count}</Text>
      </View>
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