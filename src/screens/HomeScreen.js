import React from "react";
import {
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/HomeStyles";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/images/home-bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.heading}>
          Trips are better{"\n"}together
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Trips")
          }
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}