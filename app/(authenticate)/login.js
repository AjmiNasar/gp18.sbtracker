import { useEffect, useState,useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
import { useRouter } from "expo-router";
import {AuthContext} from './context/AuthContext';
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';
export default function App() {
  const [username, setUsername ] = useState("")
  const [Password, setPassword ] = useState("")
  const [schoolid, setSchoolid ] = useState("")
  const {isLoading, login} = useContext(AuthContext);
   
  const dismissKeyboard = () => {
      Keyboard.dismiss();
    }

    
    const [errors, setErrors ] = useState({})
   

    const validateForm = ()=>{
      let errors= {};

      if(!username) errors.username = "username is required";
      if(!Password) errors.Password = "password is required";
      if(!schoolid) errors.schoolid = "School-id is required";

      setErrors(errors);

      return Object.keys(errors).length ===0;

    };

    const handleSubmit = ()=>{
      if (validateForm()) {
         login(username,Password,schoolid);
        // console.log("Submitted", username, Password, schoolid);
        setUsername("");
        setPassword("");
        setSchoolid("");
        setErrors({});
      
      }
    }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <KeyboardAvoidingView behavior= "padding" style={styles.container}>
    
      <View style={styles.form}>
      <Spinner visible={isLoading} />

        <Text style= {styles.label}>login</Text>
       
        <TextInput style= {styles.input} placeholder='Username' value={username} onChangeText={setUsername}/>

        {
          errors.username ? <Text style= {styles.errorText}>{errors.username}</Text> : null
        }
    
        <TextInput style= {styles.input} placeholder='Password' secureTextEntry value={Password} onChangeText={setPassword}/>

        {
          errors.Password ? <Text style= {styles.errorText}>{errors.Password}</Text> : null
        }

        <TextInput style= {styles.input} placeholder='School-id' value={schoolid} onChangeText={setSchoolid}/>

        {
          errors.schoolid ? <Text style= {styles.errorText}>{errors.schoolid}</Text> : null
        }
        

        <Button title='Submit' onPress= {handleSubmit}  color="#F98B88" />
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
    marginLeft:95,
    fontSize: 30,
    marginBottom: 50,
    fontWeight: "bold",
    color: "#F98B88"
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
      backgroundColor: '#FFC5C5',
      zIndex:-2,
  },
  circle: {
    position: 'absolute',
    top: -60, 
    right: -60, 
    width: 250,
    height: 250, 
    borderRadius: 120,
    backgroundColor: '#90DBD3',
    zIndex:-2
    // transform: [{ rotate: '45deg' }],
  },
});


