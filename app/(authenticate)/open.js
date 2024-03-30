import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Image,
    ImageBackground
  } from "react-native";
import React from 'react';
import { useRouter } from "expo-router";



const open = () => {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
   
      <View style={{ marginTop: 250 }}>
        <Text style={{ fontSize: 40, fontWeight: "600", color: "black",textAlign:'center' }}>
          Where is my
        </Text>
        <Text style={{ fontSize: 40, fontWeight: "600", color: "#F98B88" ,textAlign:'center' }}>
         School Bus
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "200", color: "black",textAlign:'center'  }}>
         Track Your Bus Anytime
        </Text>
        <Pressable
            onPress={() => router.replace("/login")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
              Login
            </Text>
          </Pressable>
        <Pressable
            onPress={() => router.replace("/register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
             New User?
            </Text>
          </Pressable>
      </View>
      <KeyboardAvoidingView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default open

const styles = StyleSheet.create({})