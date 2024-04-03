import {
  NativeAppEventEmitter,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Redirect } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: "#e0e0e0",
          height: 110,
          borderBottomEndRadius: 40,
          borderBottomStartRadius: 40,
        }}
      >
        <Pressable
          onPress={() => router.replace("/(pages)/profile")}
          style={{
            marginLeft: 15,
            paddingHorizontal: 10,
            paddingVertical: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome name="user-circle-o" size={34} color="black" />
        </Pressable>
        <Text style={{ marginLeft: 10, color: "black", fontSize: 20 }}>
          Where is my
        </Text>
        <Text style={{ color: "#F98B88", fontSize: 20 }}>School Bus</Text>
      </View>
     

      <ScrollView style={{ flex: 1}}>
        <View style={{ padding:10 }}>
        <View style={{top:80,left:30,backgroundColor:"#e0e0e0",height:30,width:160}}>
          <Text style={{ marginLeft: 10, color: "#068473", fontSize: 15 }}>Pick your child's bus</Text>
        </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "left",
              marginTop: 70,
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "white",
              height: 120,width:320,
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
            onPress={() => router.replace("/(pages)/Businfo")}>
              <Text style={{ top:0, fontSize: 25, textAlign: "left",marginLeft:30 }}>Bus No 1</Text>
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
              height: 120,width:320,
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
              <Text style={{top:0, fontSize: 25, textAlign: "left",marginLeft:30 }}>Bus No 2</Text>
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
              height: 120,width:320,
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
              <Text style={{ top:0, fontSize: 25, textAlign: "left",marginLeft:30 }}>Bus No 3</Text>
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
              height: 120,width:320,
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
              <Text style={{ top:0, fontSize: 25, textAlign: "left",marginLeft:30 }}>Bus No 4</Text>
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
              height: 120,width:320,
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
            <Text style={{top:0, fontSize: 25, textAlign: "left",marginLeft:30 }}>Bus No 5</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
