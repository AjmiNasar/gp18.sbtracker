import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import * as Location from 'expo-location'
import {Switch,ActivityIndicator} from 'react-native-paper'
import locationImage from '../../../assets/location.png'

const index = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  
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
        setIsSwitchOn(false)
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
        setIsSwitchOn(true)
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
    // ws.onmessage=(e)=>{
    // }
  },[location])

  return (
    <SafeAreaView className="mt-5">
      <View className="flex flex-row justify-between p-6 bg-blue-500">
        <Text className="p-3 text-lg">Location</Text>
        <Text>
          <Switch value={isSwitchOn}/>
        </Text>

      </View>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      {location ? (
        <View className="items-center">
          <Text className="my-5 text-xl font-semibold">You can start your journey!</Text>
          <View className="flex flex-col items-center  gap-y-3">
          <Image source={locationImage} className="aspect-square w-20 h-20"/>
          <Text>
            Latitude: {location.coords.latitude}
          </Text>
          <Text>
            Longitude: {location.coords.longitude}
          </Text>
          <Text>Speed: {location.coords.speed ? location.coords.speed.toFixed(2) : 'Not Available'} m/s</Text>
        </View>
      </View>
      ) : (
        <View className="items-center top-40">
        <Text>
          <ActivityIndicator animating={true} size={'large'}/>
        </Text>
        </View>
      )}
    </SafeAreaView>
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