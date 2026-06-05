import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/TripsStyles";

export default function TopHeader() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      <View style={styles.headerIcons}>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
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