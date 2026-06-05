import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../context/AuthContext";
import styles from "../styles/TripsStyles";

export default function TopHeader() {
  const { logout } = useAuth();

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
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={28}
            color="#222"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.plusButton}>
          <Ionicons
            name="add"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}