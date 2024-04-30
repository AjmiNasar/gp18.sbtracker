import { StyleSheet, Text, View ,StatusBar} from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import {AuthProvider} from './(authenticate)/context/AuthContext';

const index = () => {
  return (
      <Redirect href="/(authenticate)/open"/>
   
  );
};

export default index;

const styles = StyleSheet.create({});

// -> "/"


