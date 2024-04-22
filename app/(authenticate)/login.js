import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from "expo-router";
import axios from 'axios'
export default function App() {
    const [userdata,setuserdata]=useState([])
    useEffect(()=>{
      axios.get("https://social-choice-catfish.ngrok-free.app/userdata").then((response)=>
      {
        const data=response.data.data 
        console.log(data)
        setuserdata(data)
    
    }).catch((err)=>console.log(err))
    },[])

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
       
            router.replace("/(tabs)/Home");
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

        <Button title='Submit'  onPress= {handleSubmit}/>
     </View>
     </KeyboardAvoidingView>
     </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
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
  }
});


