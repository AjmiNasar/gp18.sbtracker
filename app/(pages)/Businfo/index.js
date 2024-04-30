import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View,Image } from "react-native";
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
  const [dist,setDist]=useState([])
  const [speed,setSpeed]=useState(40)
  const [driverData,setDriverData]=useState(null)
  const [driverLoc,setDriverLoc]=useState(null)
  const params=useLocalSearchParams()
  const busid=parseInt(params.id)+1
  const inputRef=useRef(0)
  // const onDisplayLocalNotification = async () => {
  //   // Assuming `stops` and `dest` are defined elsewhere in your code
  
  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //   });
  
  //   // Assuming `stops` is defined elsewhere and is an array
  //   await Promise.all(stops.map(async (item) => {

  //       // Display a notification
  //       await notifee.displayNotification({
  //         title: "The wait is over! We've made it!",
  //         body: 'Your ward has reached the destination',
  //         android: {
  //           channelId,
  //         },
  //       });
      
  //   }));
  // };
  

//   async function getPlaceName(lat, lon) {
//     const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

//     try {
//         const response = await axios.get(apiUrl);
//         const data = response.data;
        
//         if (data.display_name) {
//             const placeName = data;
//             console.log('Place Name:', placeName);
//             setDriverLoc(placeName)
//         } else {
//             console.log('No results found');
//         }
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// }


  useEffect(()=>{

    axios.get(`https://social-choice-catfish.ngrok-free.app/getbusdetailseve/${busid}`).then((response)=>
    {
      // setAllstops(response.data)
      // setAllstops(response.data.data)
      const data=response.data.data.stops 
      const times=response.data.time
      const dists=response.data.distances
      setTime(times)
      setDist(dists)
      console.log(data)
      data.forEach((element) => {
        setStops((prev)=>[...prev,element.name])
      });
  
  
  }).catch((err)=>console.log(err))
  
  },[])

  useEffect(()=>{
    console.log(inputRef.current)
    inputRef.current.scrollBottom=50
    ws= new WebSocket("ws://social-choice-catfish.ngrok-free.app/ws")
    ws.onopen=()=> {
    ws.send("Connected to React")
    ws.send("Message 2")
    }
    ws.onmessage=(e)=>{
      console.log("Message",e.data)
      // if(JSON.parse(e.data)){
      //   console.log("Parsed")
      // }
      // else{
      //   console.log('Not parsed')
      // }
      try{
        const temp=JSON.parse(e.data)
        if(temp.Place){
          setDriverLoc(temp.Place)
          setDriverData(temp)
        }
        else{
          setDriverData(temp)
        }
        
        // const lat=parseInt(temp.Latitude)
        // const lon=parseInt(temp.Longitude)
        // getPlaceName(lat,lon)

      }
      catch{
        console.log(e.data)
      }
      }
  
  // const interval=setInterval( async ()=>{
  //   ws.onmessage=(e)=>{
  //   console.log(e.data)
  //   // setDriverData(e.data)
  //   }
  // },2500)
  // return () => clearInterval(interval);
  
  },[])

  useEffect(()=>{
    if(speed!==40 && data){
      data.map((e,index)=>{
        if(index>0){
          const d=dist[index-1]
          const factor=d/speed

        const t=e.time
        var timeParts = t.split(":");
        var hours = parseInt(timeParts[0]);
        var minutes = parseInt(timeParts[1]);
        var dateObj = new Date();
        dateObj.setHours(hours);
        dateObj.setMinutes(minutes);
        var millisecondsToAdd = factor * 60 * 1000; 

        dateObj.setTime(dateObj.getTime() + millisecondsToAdd);
        var newHours = dateObj.getHours();
        var newMinutes = dateObj.getMinutes();
        var newTimeString = (newHours < 10 ? '0' : '') + newHours + ':' + (newMinutes < 10 ? '0' : '') + newMinutes;
        return (
          data.delay=newTimeString
        )
      }
      })
    }
  },[speed])
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
            will be arriving at {time}
          </Text>
          <View>
            <Text>Driver Details</Text>
            <Text>
              {driverData?`Latitude: ${driverData.Latitude} , Longitude : ${driverData.Longitude}`:`Not available`}
              </Text>
            <Text>
              {driverLoc?`${driverLoc}`:'Not determinable'}
            </Text>
          </View>
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

      <View style={styles.container} className="relativ h-auto">
        <View style={styles.busPointer}>
        <FontAwesome5 name="bus-alt" size={20} color="black"/>
        </View>
        <Timeline
        ref={inputRef}
        timeStyle={{textAlign: 'center', backgroundColor:'#006268', color:'white', padding:7, borderRadius:13}}
          data={data}
          circleSize={23}
          circleColor="#FF9292"
          innerCircle={'dot'}
          lineColor="black"
          titleStyle={styles.title}
          timeContainerStyle={{...styles.time,maxHeight: 300}}
          descriptionStyle={styles.description}
          className="h-full"
          renderDetail={(rowData, sectionID, rowID) => (
            <View style={styles.detailContainer}>
              <Text style={styles.title}>{rowData.title}</Text>

              <Text style={styles.description}>{rowData.delay}</Text>
            </View>
          )}
        />
      </View>
      <View className="flex flex-col my-3">
      <Text className="mx-auto">Get on Map</Text>
      <Link  href={{pathname:"../Map"}} className="mx-auto"
        contentFit="cover">
      <Image
        contentFit="cover"
        source={require("../../../assets/maps 2.png")}
        onPress={()=>{
          router.replace('(pages)/Map')
        }}
      />
      </Link>
      </View>
      {/* <Map/> */}
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