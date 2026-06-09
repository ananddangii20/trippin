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
    <View
      style={[
        styles.navbar,
        {
          backgroundColor:
            "rgba(255,255,255,0.95)",
          borderTopColor: "#DCEBFF",
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive =
          activeTab === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.navItem}
            onPress={() =>
              handleNavigation(tab)
            }
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={
                isActive
                  ? "#2563EB"
                  : "#94A3B8"
              }
            />

            <Text
              style={{
                color: isActive
                  ? "#2563EB"
                  : "#94A3B8",

                fontSize: 12,
                marginTop: 4,

                fontWeight: isActive
                  ? "700"
                  : "500",
              }}
            >
              {tab.name}
            </Text>

            {isActive && (
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor:
                    "#F4C16D",
                  marginTop: 4,
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}