import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
import React,{ useEffect, useState } from 'react'
import { useRouter } from "expo-router";

export default function register(){
  const [userdata,setuserdata]=useState([])
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [username, setUsername ] = useState("")
  const [Password, setPassword ] = useState("")
  const [schoolid, setSchoolid ] = useState("")
  const [errors, setErrors ] = useState({})
  const router = useRouter();

  const validateForm = ()=>{
    let errors= {};

    if(!username) errors.username = "username is required";
    if(!Password) errors.Password = "password is required";
    if(!schoolid) errors.schoolid = "school-id is required";

    setErrors(errors);

    return Object.keys(errors).length ===0;

  };

  const handleSubmit = ()=>{
    if (validateForm()) {
      console.log("Submitted", username, Password, schoolid);
      userdata.forEach((element)=>{
        if(element.username===username && element.password===Password){
          setUsername("");
          setPassword("");
          setSchoolid("");
          setErrors({});
     
          router.replace("/(pages)/Schoolinfo");
        }
      })
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

        <Text style= {styles.label}>register</Text>
        <TextInput style= {styles.input} placeholder='School' value={username} onChangeText={setUsername}/>

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

        <Button title='Submit' onPress= {()=>{router.replace('/(pages)/Schoolinfo');}}   color="#DC6666" />
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
    color: "#9B6868"
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
      backgroundColor: '#FF8686',
      zIndex:-2,
  },
  circle: {
    position: 'absolute',
    top: -60, 
    right: -60, 
    width: 250,
    height: 250, 
    borderRadius: 120,
    backgroundColor: '#FFC5C5',
    zIndex:-2
    // transform: [{ rotate: '45deg' }],
  },
});



