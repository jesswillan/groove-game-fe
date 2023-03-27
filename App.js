import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import NavBar from './components/NavBar';
import {Ionicons} from "@expo/vector-icons"
import NavHome from './tab-navigation-icons/NavHome';


export default function App() {
  return (
    <View style={styles.container}>
      < Header/>
      < NavBar/>
      < NavHome/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
