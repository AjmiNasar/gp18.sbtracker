import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Redirect } from "expo-router";
import {PaperProvider} from 'react-native-paper';

export default function App() {
  return <Redirect href="/(authenticate)/open"/>; 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});