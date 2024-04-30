import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState,useRef } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Timeline from "react-native-timeline-flatlist";
import {Link, useNavigation} from 'expo-router'
import { useLocalSearchParams, useRouteInfo, useRouter } from "expo-router/build/hooks";
import axios from 'axios';


const index = (navigation) => {
  const [stops,setStops]=useState([])
  const [times,setTime]=useState([])
  const params=useLocalSearchParams()
  const busid=parseInt(params.id)+1

  useEffect(()=>{

    axios.get(`https://de5d-2401-4900-614c-9582-a57e-2b57-cd43-5d93.ngrok-free.app/${busid}`).then((response)=>
    {
      // setAllstops(response.data)
      // setAllstops(response.data.data)
      const data=response.data.data.stops 
      const times=response.data.time
      setTime(times)
      console.log(data)
      data.forEach((element) => {
        setStops((prev)=>[...prev,element.name])
      });
  
  
  }).catch((err)=>console.log(err))
  ws= new WebSocket("ws://social-choice-catfish.ngrok-free.app/ws")
  ws.onopen= ()=> ws.send("Connected to React")
  },[])
  const initial="03:30"
  var place = "";
  var time;
  var stop_name = "School";

  const data = [
    { time: initial, title: "School", delay: "03:30" },
    { time: times[0], title: stops[0], delay: "03:34" },
    { time: times[1], title: stops[1], delay: "03:40" }, // No delay
    { time: times[2], title: stops[2], delay: "03:45" },
    { time: times[3], title: stops[3], delay: "03:48" }, // No delay
    { time: times[4], title: stops[4], delay: "03:52" }, // No delay
  ];
  const handleclick=()=>{
    ws.send("Hi from Native")
  }
  
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: "#7AAFB3",
          justifyContent: "center",
          height: 90,
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,
        }}
      >
      <View>
      <Entypo style={{top:30,left:130}} name="back-in-time" size={18} color="red" />
      </View>
        <View
          style={{
            flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "center",
            height: 60,
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text style={{ color: "black", fontSize: 16 }}>
            Your ward has reached {place}
          </Text>
          <Text style={{ color: "red", textAlign: "center" }}>
            will be arriving at 
          </Text>
          <TouchableOpacity onPress={handleclick}><Text></Text></TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          gap: 8,
          height: 35,
          justifyContent: "center",
          width: 70,
          margin: 40,
          marginLeft: 20,

          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 20,
          },
          shadowOpacity: 0.75,
          shadowRadius: 4,
          elevation: 10,
        }}
      >
        <Text style={{ color: "red" }}>Bus No {busid}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.busPointer}>
        <FontAwesome5 name="bus-alt" size={20} color="black" style={styles.fadeAnimation} />
        </View>
        <Timeline

         timeStyle={{textAlign: 'center', backgroundColor:'#006268', color:'white', padding:7, borderRadius:13}}
          data={data}
          circleSize={23}
          circleColor="#FF9292"
          innerCircle={'dot'}
          lineColor="black"
          titleStyle={styles.title}
          timeContainerStyle={{...styles.time,maxHeight: 300}}
          descriptionStyle={styles.description}
          renderDetail={(rowData, sectionID, rowID) => (
            <View style={styles.detailContainer}>
              <Text style={styles.title}>{rowData.title}</Text>
              <Text style={styles.description}>{rowData.delay}</Text>
            </View>
          )}
        />
        </View>

      <Text style={[styles.getOnMap, styles.busNo1Typo]}>GET ON MAP</Text>
      <Image
        style={styles.maps2Icon}
        contentFit="cover"
        source={require("../../../assets/maps 2.png")}
      />
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  fadeAnimation: {
    opacity: 0.6, // Set the initial opacity to 0.6
  },
  container: {
    marginLeft: 100,
    flex: 1,
    marginTop: 6,
    maxHeight:370
  },
  busPointer: {
    position: "absolute",
    top: -6,
    left: 59,
    zIndex:1
  },
  time:{
    fontsize:15,
    top:-4
  },
  title: {
    marginTop: -15,
    fontSize: 20,
    color: "black",
    marginBottom: 70,
  },
  description: {
    paddingTop:5,
    color: "red",
   left: -75,
    top:-70,
    fontSize:15
  },
  getOnMap: {
    top: 644,
    left: 9,
    color: "#00535f",
    width: 189,
    height: 21,
  },
  busNo1Typo: {
    textAlign: "center",

    fontWeight: "700",
    fontSize: 12,
    position: "absolute",
  },
  maps2Icon: {
    top: 685,
    left: 64,
    width: 247,
    height: 150,
    position: "absolute",
  },

});
