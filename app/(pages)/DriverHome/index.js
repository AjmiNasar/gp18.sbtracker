import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location'

const index = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  useEffect(() => {

    ws=new WebSocket("ws://social-choice-catfish.ngrok-free.app/ws")
    ws.onopen=()=>{
    ws.send("From Driver")
  }
    // Request permission to access location in foreground and background
    const requestLocationPermission = async () => {
      let foregroundStatus = await Location.requestForegroundPermissionsAsync();
      let backgroundStatus = await Location.requestBackgroundPermissionsAsync();

      if (foregroundStatus.status !== 'granted' || backgroundStatus.status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Start the timer to get current position periodically
      const timerId = setInterval(getCurrentPosition, 2000); // Runs every 5 seconds

      // Cleanup function to clear the interval when component unmounts
      return () => clearInterval(timerId);
    };

    // Function to get current position
    const getCurrentPosition = async () => {
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setErrorMsg(null);
      } catch (error) {
        setErrorMsg(error.message);
      }
    };

    // Call the function to request location permission
    requestLocationPermission();
  }, []);
  useEffect(()=>{
    if(location){
      const driverData={'Latitude':location.coords.latitude,'Longitude':location.coords.longitude}
      ws.send(JSON.stringify(driverData))
    }
    ws.onmessage=(e)=>{
      console.log(e.data)
    }
  },[location])

  return (
    <View style={styles.container}>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      {location ? (
        <View>
          <Text>
            Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
          </Text>
          <Text>Speed: {location.coords.speed ? location.coords.speed.toFixed(2) : 'Not Available'} m/s</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
const getLocationData = () => {
  return location;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default index