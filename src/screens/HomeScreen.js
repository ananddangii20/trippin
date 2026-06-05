import React from "react";
import {
  ActivityIndicator,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../context/AuthContext";
import styles from "../styles/HomeStyles";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { initializing, user } = useAuth();

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

        {initializing ? (
          <ActivityIndicator
            size="large"
            color="#5B35F2"
          />
        ) : user ? (
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
        ) : (
          <View style={styles.authButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Login")
              }
            >
              <Text style={styles.buttonText}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() =>
                navigation.navigate("Signup")
              }
            >
              <Text style={styles.secondaryButtonText}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}
