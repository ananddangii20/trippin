import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/TripsStyles";

export default function BottomNavbar() {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="home"
          size={24}
          color="#6A40F4"
        />
        <Text style={styles.activeNav}>
          Trips
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="wallet-outline"
          size={24}
        />
        <Text>Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="chatbubble-outline"
          size={24}
        />
        <Text>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="calendar-outline"
          size={24}
        />
        <Text>Bookings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="person-outline"
          size={24}
        />
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}