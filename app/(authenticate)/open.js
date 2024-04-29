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
          <View style={styles.container}>
          <View style={styles.rectangle} />
          </View>
      <View style={{ marginTop: 250 }}>
        <Text style={{ fontSize: 40, fontWeight: "600", color: "black",textAlign:'center' }}>
          Where is my
        </Text>
        <Text style={{ fontSize: 40, fontWeight: "600", color: "#F98B88" ,textAlign:'center' }}>
         School Bus
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "200", color: "black",textAlign:'center',marginTop:10  }}>
         Track Your Bus Anytime
        </Text>
        <View style ={{flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop: 15,}}>
        <Pressable
            onPress={() => router.navigate("/login")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 15, color: "brown" ,marginRight:20}}>
              Login
            </Text>
          </Pressable>
        <Pressable
            onPress={() => router.navigate("/register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 15, color: "brown" }}>
              Register
            </Text>
          </Pressable>



          <Pressable
            onPress={() => router.navigate("/(pages)/Trial")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 15, color: "brown" }}>
              Trial
            </Text>
          </Pressable>




          </View>
          <View style={{ alignItems: "center", marginTop: 15 }}>
          <Image source={require('../../assets/bus.png')} style={{ width: 280, height: 220 ,marginTop:50}} />
          <View style={styles.oval}/>
        </View>
      </View>
      <KeyboardAvoidingView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


export default open

const styles = StyleSheet.create({container: {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '50%',
  height: '25%',
  overflow: 'hidden',
},
rectangle: {
  position: 'absolute',
  top: -60, // Adjust the position as needed
  right: -60, // Adjust the position as needed
  width: 250, // 120 * 2 for width
  height: 240, // 120 * 2 for height
  borderBottomLeftRadius: 100,
  backgroundColor: '#FF9292',
  // transform: [{ rotate: '45deg' }],
},
oval:{
  width: 235,
  height: 208,
  backgroundColor: '#FFE1E1',
  borderRadius: 120,
  position:'absolute',
  bottom: -104,  // Half of the height to align it below the image
zIndex:-1,
marginBottom:150,
right:60

}}
)
