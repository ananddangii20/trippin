import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../context/AuthContext";
import styles from "../styles/TripsStyles";

export default function TopHeader() {
  const { logout } = useAuth();
  const navigation = useNavigation();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log("Logout error:", error);
    }
  }

  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      <View style={styles.headerIcons}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CreateTrip")
          }
        >
          <Ionicons
            name="add-circle"
            size={30}
            color="#2563EB"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={28}
            color="#1E293B"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}