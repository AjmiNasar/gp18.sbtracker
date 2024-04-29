
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
  } from "react-native";
  import React,{useEffect,useState} from "react";
  import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
  import { Link, useRouter } from "expo-router";
  import axios from 'axios';
import { Color, FontSize, FontFamily } from "../../GlobalStyles";

const index = () => {
    const router = useRouter();
  return (
    <View style={styles.androidLarge7}>
      <View style={styles.androidLarge7Child} />
      <Text style={[styles.place, styles.schoolLayout, { top: 192 }]}>School</Text>
<Text style={[styles.place, styles.schoolLayout, { top: 251 }]}>Chittoor</Text>
<Text style={[styles.place, styles.schoolLayout, { top: 310 }]}>Edayakunnam</Text>
<Text style={[styles.place, styles.schoolLayout, { top: 369 }]}>Cherannellur</Text>
<Text style={[styles.place, styles.schoolLayout, { top: 428 }]}>Kacheripady</Text>
<Text style={[styles.place, styles.schoolLayout, { top: 487 }]}>Varapuzha</Text>
<Text style={[styles.place, styles.schoolLayout, { top: 546 }]}>Paravur</Text>

  <Text style={[styles.am, styles.amTypo]}>03:30 AM</Text>
  <Text style={[styles.am, styles.amTypo, { top: 257, left: 78 }]}>03:42 AM</Text>
  <Text style={[styles.am, styles.amTypo, { top: 315, left: 80 }]}>03:54 AM</Text>
  <Text style={[styles.am, styles.am3Typo, { top: 369 }]}>04:15 AM</Text>
  <Text style={[styles.am, styles.am3Typo, { top: 430 }]}>04:38 AM</Text>
  <Text style={[styles.am, styles.am3Typo, { top: 487 }]}>04:52 AM</Text>
  <Text style={[styles.am, styles.am3Typo, { top: 546 }]}>05:32 AM</Text>
      <Image
        style={[styles.busIcon, styles.schoolLayout]}
        contentFit="cover"
        source={require("../../../assets/busicon.png")}
      />
      <View style={styles.yourWardHasReachedEdayakunParent}>
        <Text style={styles.yourWardHas}>
          Your ward has reached Edayakunnam
        </Text>
        <Text style={styles.willBeArriving}>will be arriving at 04:53</Text>
       
      </View>
      <View style={styles.busNo1Wrapper}>
        <Text style={[styles.busNo1, styles.busNo1Typo]}> bus no 1</Text>
      </View>
      <Text style={[styles.am7, styles.am7Typo]}>03:55 AM</Text>
      <Text style={[styles.am8, styles.am7Typo]}>04:15 AM</Text>
      <Text style={[styles.am9, styles.am7Typo]}>04:35 AM</Text>
      <Text style={[styles.am10, styles.am10Typo]}>04:53 AM</Text>
      <Text style={[styles.am11, styles.am10Typo]}>05:15 AM</Text>
      <Text style={[styles.am12, styles.am7Typo]}>05:55 AM</Text>
      <Text style={[styles.busStartedAt, styles.am7Typo]}>
        Bus started at 03:35
      </Text>
      <Text style={[styles.getOnMap, styles.busNo1Typo]}>GET ON MAP</Text>
      {[183, 244, 302, 358, 419, 476, 534].map((top, index) => (
        <Image
          key={index}
          style={[styles.fullStopIcon, styles.fullIconLayout, { top: top }]}
          contentFit="cover"
          source={require("../../../assets/full-stop.png")}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  schoolLayout: {
    height: 28,
    position: "absolute",
  },
  amTypo: {
    height: 9,
    width: 66,
    color: Color.colorDarkslategray_100,
    fontSize: 12,
    textAlign: "left",
    position: "absolute",
  },
  am3Typo: {
    left: 82,
    height: 9,
    width: 66,
    color: Color.colorDarkslategray_100,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.quicksandRegular,
    position: "absolute",
  },
  busNo1Typo: {
    textAlign: "center",
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
    fontSize: FontSize.size_mini,
    position: "absolute",
  },
  am7Typo: {
    height: 16,
    width: 145,
    color: Color.colorFirebrick_100,
    fontSize: FontSize.size_3xs,
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  am10Typo: {
    left: 91,
    height: 16,
    width: 145,
    color: Color.colorFirebrick_100,
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.quicksandSemiBold,
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  fullIconLayout: {
    height: 41,
    width: 13,
    left: 165,
    position: "absolute",
  },
  androidLarge7Child: {
    top: 170,
    left: 170,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderRightWidth: 1,
    width: 1,
    height: 414,
    position: "absolute",
  },
  place: {
    top: 192,
    width: 126,
    color: 'black',
    // fontFamily: FontFamily.quicksandRegular,
    // fontSize: FontSize.size_mini,
    left: 196,
    height: 28,
    textAlign: "left",
    position:"absolute"
  },  

  am: {
    top: 198,
    left: 80,
    height: 9,
    width: 66,
    color: '#004C50',
    fontSize:12,
  },
  
  am6: {
    top: 546,
  },
  busIcon: {
    top: 179,
    left: 160,
    width: 21,
  },
  yourWardHas: {
    top: 38,
    left: 27,
    fontSize: 16,
    width: 314,
    height: 24,
    fontFamily: FontFamily.quicksandSemiBold,
    fontWeight: "600",
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  willBeArriving: {
    top: 62,
    left: 140,
    fontSize: 14,
    fontWeight: "300",
    fontFamily: FontFamily.quicksandLight,
    color: "#a50e0e",
    width: 272,
    height: 11,
    textAlign: "left",
    position: "absolute",
  },
  yourWardHasReachedEdayakunParent: {
    left: 0,
    borderRadius: 20,
    backgroundColor: "#bce49d",
    width: 356,
    height: 100,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  busNo1: {
    left: -19,
    color: "#fd5151",
    width: 125,
    height: 25,
    top: 0,
  },
  busNo1Wrapper: {
    top: 124,
    left: 29,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: 1,
    backgroundColor: "#dedede",
    width: 86,
    height: 25,
    position: "absolute",
    overflow: "hidden",
  },
  am7: {
    top: 276,
    left: 90,
    height: 16,
    width: 145,
    color: Color.colorFirebrick_100,
    fontSize: FontSize.size_3xs,

  },
  am8: {
    top: 335,
    left: 90,
    height: 16,
    width: 145,
    color: Color.colorFirebrick_100,
    fontSize: FontSize.size_3xs,
  },
  am9: {
    top: 388,
    left: 90,
    height: 16,
    width: 145,
    color: Color.colorFirebrick_100,
    fontSize: FontSize.size_3xs,

  },
  am10: {
    top: 448,
  },
  am11: {
    top: 505,
  },
  am12: {
    top: 564,
    left: 90,
    height: 16,
    width: 145,
    color: Color.colorFirebrick_100,
    fontSize: FontSize.size_3xs,
  },
  busStartedAt: {
    top: 216,
    left: 33,

  },
  getOnMap: {
    top: 604,
    left: 9,
    color: "#00535f",
    width: 189,
    height: 21,
  },
  maps2Icon: {
    top: 625,
    left: 64,
    width: 247,
    height: 150,
    position: "absolute",
  },
  fullStopIcon: {
    top: 183,
  },
  
  androidLarge7: {
    backgroundColor: "#ebebeb",
    flex: 1,
    width: "full",
    height: 797,
    overflow: "hidden",
    
  },
});

export default index;










