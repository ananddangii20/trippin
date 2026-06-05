import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/TripsStyles";

export default function BottomNavbar({
  activeTab = "Trips",
}) {
  const navigation = useNavigation();

  const tabs = [
    {
      name: "Trips",
      icon: "home",
      screen: "Trips",
    },
    {
      name: "Wallet",
      icon: "wallet-outline",
      screen: "Wallet",
    },
    {
      name: "Chat",
      icon: "chatbubble-outline",
      screen: "Chat",
    },
    {
      name: "Bookings",
      icon: "calendar-outline",
      screen: "Bookings",
    },
    {
      name: "Profile",
      icon: "person-outline",
      screen: "Profile",
    },
  ];

  const handleNavigation = (tab) => {
    if (activeTab === tab.name) return;

    try {
      navigation.navigate(tab.screen);
    } catch (error) {
      Alert.alert(
        "Coming Soon",
        `${tab.name} screen is not available yet`
      );
    }
  };

  return (
    <View style={styles.navbar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.navItem}
          onPress={() => handleNavigation(tab)}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={
              activeTab === tab.name
                ? "#6A40F4"
                : "#888"
            }
          />

          <Text
            style={{
              color:
                activeTab === tab.name
                  ? "#6A40F4"
                  : "#888",
              fontSize: 12,
              marginTop: 4,
              fontWeight:
                activeTab === tab.name
                  ? "600"
                  : "400",
            }}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}