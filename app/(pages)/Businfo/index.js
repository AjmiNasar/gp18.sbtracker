import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Timeline from "react-native-timeline-flatlist";
import {Link, useNavigation} from 'expo-router'
import { useLocalSearchParams, useRouteInfo, useRouter } from "expo-router/build/hooks";
import axios from 'axios';


const index = (navigation) => {
  const [stops,setStops]=useState([])
  const params=useLocalSearchParams()
  const busid=parseInt(params.id)+1

  useEffect(()=>{
    axios.get("https://09c8-2401-4900-332a-e697-4550-a036-ca21-ada5.ngrok-free.app/getbusdetailseve").then((response)=>
    {
      // setAllstops(response.data)
      // setAllstops(response.data.data)
      const data=response.data.data[params.id].stops 
      console.log(data)
      data.forEach((element) => {
        setStops((prev)=>[...prev,element.name])
      });

  
  
  }).catch((err)=>console.log(err))
  },[])

  var place = "";
  var time;
  var stop_name = "School";
  const data = [
    { time: "09:00", title: "School", delay: "09:00" },
<<<<<<< Updated upstream
    { time: "09:10", title: "Pallimoola", delay: "09:15" },
    { time: "09:17", title: "Cheroor", delay: "09:23" }, 
    { time: "09:28", title: "asdgfd", delay: "09:28" },
    { time: "09:35", title: "zfgxhjg", delay: "09:34" }, 
=======
    { time: "09:10", title: stops[0], delay: "09:15" },
    { time: "09:17", title: stops[1], delay: "09:23" }, // No delay
    { time: "09:28", title: stops[2], delay: "09:28" },
    { time: "09:35", title: stops[3], delay: "09:34" }, // No delay
    { time: "09:45", title: stops[4], delay: "09:46" }, // No delay
>>>>>>> Stashed changes
  ];

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: "#BFEE90",
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
        <FontAwesome5 name="bus-alt" size={20} color="#4169E1" />
        </View>
        <Timeline
          data={data}
          circleSize={8}
          circleColor="#343434"
          lineColor="black"
          titleStyle={styles.title}
          timeContainerStyle={styles.time}
          descriptionStyle={styles.description}
          renderDetail={(rowData, sectionID, rowID) => (
            <View style={styles.detailContainer}>
              <Text style={styles.title}>{rowData.title}</Text>

              <Text style={styles.description}>{rowData.delay}</Text>
            </View>
          )}
        />
      </View>
      {/* <Map/> */}
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    marginLeft: 100,
    flex: 1,
    marginTop: 10,
  },
  busPointer: {
    position: "absolute",
    top: -4,
    left: 55,
  },
  time:{
    fontsize:10,
    top:-4
  },
  title: {
    marginTop: -15,
    fontSize: 15,
    color: "black",
    marginBottom: 70,
  },
  description: {
    color: "red",
   left: -75,
    top:-70,
    fontSize:12
  },
});
