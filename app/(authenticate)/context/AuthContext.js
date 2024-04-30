import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { useRouter } from "expo-router";

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
  const [userToken, setUserToken] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // const [splashLoading, setSplashLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const bcrypt = require('bcryptjs');
 
  const login = async (username, password,schoolid) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('schoolid', schoolid);
    formData.append('disabled',false);
    formData.append('access_token',null);

   

    
      try {
        const response = await axios.post(
            " https://f06b-2409-40f3-1094-d1fd-a98f-5af8-7619-a3ee.ngrok-free.app/login",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data" // Set Content-Type to multipart/form-data for FormData
                }
            }
        );
        const { access_token, token_type } = response.data;
        
        // if (response.status >= 200 && response.status < 300)
        if (response.status >= 200 && response.status < 300) {
          const userToken = response.data.access_token;
          setUserToken(userToken);
          console.log("Login Successful");
          AsyncStorage.setItem('userToken', userToken);
          if(userToken){
            router.replace("/(tabs)/Home");
          }
          console.log(response.data);
          setIsLoading(false);
        }else {
            console.log("Login Failed");

       }
      
    }catch (error) {
          console.log("Login Error:",error);
          
         }
         setIsLoading(false);
        }
      
       const logout = () => {
          setIsLoading(true);
          setUserToken(null);
          AsyncStorage.removeItem('userToken').then(() => {
            if (userToken === null) {
              router.replace("/open");
            }
            setIsLoading(false);
          });
        };

  const isLoggedIn = async () => {
    try {
      // setSplashLoading(true);
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      // userInfo = JSON.parse(userInfo);

      setUserToken(userToken);
      if(userToken){
        router.replace("/(tabs)/Home");
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`is logged in error ${e}`);
    }
  };
  

  useEffect(() => {
    isLoggedIn();
  }, []);


  return (
  
    
    
    
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        setUserToken,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
  

  };