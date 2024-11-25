import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Camera from './components/Camera'

export default function App() {
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'royalblue',
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 20,
  },
  camera: {
    width: '100%', 
    height: '50%',
    borderRadius: 10, 
    marginBottom: 20,
  },
});
