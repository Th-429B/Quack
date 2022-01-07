import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import { Audio } from 'expo-av';
import Clicker from "./clicker";
import Sound from "./sound";



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Clicker/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
