import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';


export default function Sound() {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const sound = new Audio.Sound();
    const status = await sound.loadAsync(require('./assets/quack.mp3'));
    
    setSound(sound);

    console.log('Playing Sound');
    await sound.replayAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View >
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}