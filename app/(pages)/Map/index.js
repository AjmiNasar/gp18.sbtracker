import React,{useState,useEffect}from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function App() {
    const[mapRegion,setMapregion]=useState({
        latitude:10.5362,
         longitude:76.2164
    })
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}/>
      <Marker coordinate={mapRegion}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});