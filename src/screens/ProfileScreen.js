import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import BottomNavbar from "../components/BottomNavbar";
import { useAuth } from "../context/AuthContext";

import styles from "../styles/ProfileStyles";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      title: "My Trips",
      icon: "airplane-outline",
      onPress: () => navigation.navigate("Trips"),
    },
    {
      title: "Settings",
      icon: "settings-outline",
      onPress: () => Alert.alert("Coming Soon"),
    },
    {
      title: "Help & Support",
      icon: "help-circle-outline",
      onPress: () =>
        Alert.alert(
          "Support",
          "support@trippin.com"
        ),
    },
    {
      title: "Log Out",
      icon: "log-out-outline",
      onPress: handleLogout,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Profile
        </Text>

        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#6A40F4"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 110,
        }}
      >
        {/* PROFILE + STATS CARD */}
        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            {user?.photoURL ? (
              <Image
                source={{
                  uri: user.photoURL,
                }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons
                  name="person"
                  size={36}
                  color="#6A40F4"
                />
              </View>
            )}

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                {user?.displayName || "User"}
              </Text>

              <Text style={styles.username}>
                {user?.email || ""}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                12
              </Text>
              <Text style={styles.statLabel}>
                Trips
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                ₹45K
              </Text>
              <Text style={styles.statLabel}>
                Budget
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                48
              </Text>
              <Text style={styles.statLabel}>
                Places
              </Text>
            </View>
          </View>
        </View>

        {/* MENU */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuLeft}>
              <Ionicons
                name={item.icon}
                size={22}
                color="#6A40F4"
              />

              <Text style={styles.menuText}>
                {item.title}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomNavbar activeTab="Profile" />
    </SafeAreaView>
  );
}