import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AuthScreen from './src/screens/AuthScreen';

export default function App() {

  return (
    <View style={styles.container}>
      <AuthScreen />
    </View>

  );
}

const styles = StyleSheet.create({
  //Estilo del main
  container: {
    backgroundColor: '#f1f1f1',
    flex: 1
  }
});