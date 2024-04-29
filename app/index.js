import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import {PaperProvider} from 'react-native-paper'
import App from "../App";

const index = () => {
    return(
    <PaperProvider>
      <App/>
    </PaperProvider>
    )
};

export default index;

const styles = StyleSheet.create({});

// -> "/"
