import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
  } from "react-native";
  import React,{useEffect,useState} from "react";
  import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
  import { Link, useRouter } from "expo-router";
  import axios from 'axios';
  
  const index = () => {
    const router = useRouter();
    const [stops,setStops]=useState([])
    const [busData,setbusData]=useState([]);
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#90DBD3",
            height: 110,
            borderBottomEndRadius: 40,
            borderBottomStartRadius: 40,
            display:"flex",
            justifyContent:"space-between"
          }}
        >
          <Pressable
            onPress={() => router.navigate("/(pages)/profile")}
            style={{
              marginLeft: 15,
              paddingHorizontal: 10,
              paddingVertical: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5 name="school"  size={30} color="#486363" />
          </Pressable>
          {/* <Text style={{ marginLeft: -2, color: "black", fontSize: 20 }}>
            Where is my
          </Text>
          <Text style={{ color: "#F98B88", fontSize: 20 }}>School Bus</Text> */}
          <Text style={{color: "gray", fontSize: 16, marginRight:12}} onPress={()=>router.replace("/(authenticate)/open")}>Logout</Text>
        </View>
       
        <View style={styles.container}>
        <AntDesign name="pluscircle" size={24} color="black" style={styles.icon} />
        <Text style={styles.text} onPress={()=>{router.replace('/(pages)/AddBus');}}>Add buses</Text>
        </View>

        <ScrollView style={{ flex: 1}}>
          <View style={{ padding:10 }}>
          {/* <View style={{top:0,left:30,backgroundColor:"#e0e0e0",height:30,width:160}}>
            <Text style={{ marginLeft: 10, color: "#068473", fontSize: 15 }}>Update Routes</Text>
          </View> */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "left",
                marginTop: 30,
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "white",
                height: 130,width:320,
                borderRadius:10,
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
              <Pressable style={{ height: 50, color: "white" }}
              >
  
                <Link style={{ top:0, fontWeight:"600", fontSize: 25, textAlign: "left",marginLeft:30 }} href={{pathname:"../(pages)/Businfo",params:{data:[...stops],id:0}}}>Bus No 1</Link>
                <Text style={{ fontSize: 12, fontWeight: "400", color: "red",textAlign:'left',marginTop:5,marginLeft:30  }}>
                Peringaavu - Nelikunnu
                </Text>
                <View style={styles.addRoute}>
                <FontAwesome5 name="route" size={20} color="black"/>
                <Text style={styles.route}>add route</Text>
                </View>
              </Pressable>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "left",
                marginTop: 10,
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "white",
                height: 130,width:320,
                borderRadius:10,shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowOpacity: 0.75,
            shadowRadius: 4,
            elevation: 10,
                
              }}
            >
              <Pressable style={{ height: 50, color: "white" }}>
  
                <Link style={{ top:0, fontSize: 25,fontWeight:"600", textAlign: "left",marginLeft:30 }} href={{pathname:"../(pages)/Businfo",params:{data:[...stops],id:1}}}>Bus No 2</Link>
                <Text style={{ fontSize: 12, fontWeight: "400", color: "red",textAlign:'left',marginTop:5,marginLeft:30  }}>
                Peringaavu - Nelikunnu
                </Text>
                <View style={styles.addRoute}>
                <FontAwesome5 name="route" size={20} color="black" />
                <Text style={styles.route}>add route</Text>
                </View>
              </Pressable>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "left",
                marginTop:10,
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "white",
                height: 130,width:320,
                borderRadius:10,
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
              <Pressable style={{ height: 50, color: "white" }}>
  
                <Link style={{ top:0, fontSize: 25,fontWeight:"600", textAlign: "left",marginLeft:30 }} href={{pathname:"../(pages)/Businfo",params:{data:[...stops],id:2}}}>Bus No 3</Link>
                <Text style={{ fontSize: 12, fontWeight: "400", color: "red",textAlign:'left',marginTop:5,marginLeft:30  }}>
                Viyyur - Athani
                </Text>
                <View style={styles.addRoute}>
                <FontAwesome5 name="route" size={20} color="black" />
                <Text style={styles.route}>add route</Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "left",
                marginTop:10,
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "white",
                height: 130,width:320,
                borderRadius:10,
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
              <Pressable style={{ height: 50, color: "white" }}>
  
                <Link style={{ top:0, fontSize: 25,fontWeight:"600", textAlign: "left",marginLeft:30 }} href={{pathname:"../(pages)/Businfo",params:{data:[...stops],id:3}}}>Bus No 4</Link>
                <Text style={{ fontSize: 12, fontWeight: "400", color: "red",textAlign:'left',marginTop:5,marginLeft:30  }}>
                Veliyannur - Vallachira
                </Text>
                <View style={styles.addRoute}>
                <FontAwesome5 name="route" size={20} color="black" />
                <Text style={styles.route}>add route</Text>
                </View>
              </Pressable>
            </View>
          
          <View
            style={{
              flex: 1,
                justifyContent: "center",
                alignItems: "left",
                marginTop:10,
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "white",
                height: 130,width:320,
                borderRadius:10,
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
            <Pressable style={{ height: 50, color: "white" }}>
  
              <Link style={{ top:0, fontSize: 25,fontWeight:"600", textAlign: "left",marginLeft:30 }} href={{pathname:"../(pages)/Businfo",params:{data:[...stops],id:4}}}>Bus No 5</Link>
              <Text style={{ fontSize: 12, fontWeight: "400", color: "red",textAlign:'left',marginTop:5,marginLeft:30  }}>
                Mannuthy- Pattikad
                </Text>
                <View style={styles.addRoute}>
                <FontAwesome5 name="route" size={20} color="black" />
                <Text style={styles.route}>add route</Text>
                </View>
            </Pressable>
          </View>
        </ScrollView>
      </>
    );
  };
  
  export default index;
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft:30,
      marginTop:20,
      backgroundColor: '#F3EDED', // Background color for the container
      borderRadius: 120, // Border radius to create rounded corners
      padding: 10,
      width:150,
      height:45
    },
    icon: {
      marginRight: 5,
    },
    text: {
      fontSize: 16,
      fontWeight: 'semibold',
      color:"black",
      
    },
    route:{
      fontSize: 12, 
      fontWeight: "400", 
      color: "black",
      textAlign:'right',
      marginTop:5,
      marginRight:10,
      marginLeft:5
    },
    addRoute: {flexDirection:"row", 
    justifyContent:"flex-end",
    alignItems:"center",
    marginLeft:210,
    marginBottom:10,
    paddingLeft:5,
     marginRight:5,
     backgroundColor: '#E0E0E0',
     borderRadius:120,
      width:95,height:30 },


  
  });
  