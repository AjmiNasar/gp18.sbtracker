import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
import React,{ useEffect, useState } from 'react'
import { useRouter } from "expo-router";

export default function register(){

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const router = useRouter();
  const [busInfo,setBusinfo]=useState(
    {
      bus:"",
      school_pt:{ 
        "latitude": 10.5362,
        "longitude": 76.2164},
      end_pt:{},
      stops:[]
    }
  )
  const updateBus=(field,value)  => {
    setBusinfo({
      ...busInfo,
      [field]: value
    });
  };

  const postData = async () => {
    const url = `https://5ced-2401-4900-615c-9551-8887-d97-3ffb-bada.ngrok-free.app/busdet_eve`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bus: busInfo['bus'],
          school_pt: busInfo['school_pt'],
          end_pt:busInfo['end_pt'],
          stops:busInfo['stops']
        })
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        alert("Bus added successfully");
        // Do something with responseData if needed
      } else {
        alert("Failed to add bus");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  
    setBusinfo({
      bus: "",
      school_pt:{ 
        "latitude": 10.5362,
        "longitude": 76.2164},
      end_pt:"",
      stops:[]
     
    });
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <KeyboardAvoidingView behavior= "padding" style={styles.container}>
    
      <View style={styles.form}>

        <Text style= {styles.label}>Add Buses</Text>

        <TextInput style= {styles.input} onChangeText={(text) => updateBus('bus', text)}
        value={busInfo.bus} placeholder='Bus No' />

        
        <TextInput style= {styles.input} placeholder='Add End Point' // Update end_pt
            />
        <TextInput onChangeText={updateBus} style= {styles.input} placeholder='Add Stop' />

        <Button title='Submit' onPress= {postData}   color="#3C8880" />
     </View>
     <View style={styles.shape2} />
     <View style={styles.circle} />
     </KeyboardAvoidingView>
     </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    height: 400,
    width:300 ,
    marginLeft: 25,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowOpacity: 0.25,
    shadowRadius:4,
    elevation: 5
  },
  label: {
    marginTop:30,
    textAlign:"center",
    fontSize: 30,
    marginBottom: 50,
    fontWeight: "bold",
    color: "#004C50",
    justifyContent:"center"
  },
  input: {
    height:40,
    width:250,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 30,
    shadowOpacity: 0.25,
    shadowRadius:4,
    shadowColor: "black",
    marginLeft: 0
   
  },

  errorText: {
    color: "red",
    marginBottom: 10
  },
  shape2:{
      position: 'absolute',
      bottom:95, 
      width: 280, 
      height:280, 
      borderRadius:120,
      backgroundColor: '#90DBD3',
      zIndex:-2,
  },
  circle: {
    position: 'absolute',
    top: -60, 
    right: -60, 
    width: 250,
    height: 250, 
    borderRadius: 120,
    backgroundColor: '#3C8880',
    zIndex:-2
    // transform: [{ rotate: '45deg' }],
  },
});



