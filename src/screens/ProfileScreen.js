import React, {
  useEffect,
  useState,
} from "react";

import {
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";


import { db } from "../services/firebase";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import BottomNavbar from "../components/BottomNavbar";
import { useAuth } from "../context/AuthContext";

import styles from "../styles/ProfileStyles";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
const [photoURL, setPhotoURL] =
  useState(null);

  useEffect(() => {
  if (!user?.uid) return;

  const unsubscribe = onSnapshot(
    doc(db, "users", user.uid),
    (snapshot) => {
      if (snapshot.exists()) {
        setPhotoURL(
          snapshot.data().photoURL || null
        );
      }
    }
  );

  return unsubscribe;
}, [user]);


  const pickProfileImage = async () => {
  const result =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

  if (result.canceled) return;

  try {
    const asset = result.assets[0];

    const imageUrl =
      await uploadToCloudinary(asset.uri);

    await updateDoc(
      doc(db, "users", user.uid),
      {
        photoURL: imageUrl,
      }
    );

    Alert.alert(
      "Success",
      "Profile photo updated"
    );
  } catch (error) {
    console.log(error);
    Alert.alert(
      "Error",
      "Failed to upload image"
    );
  }
};


    const uploadToCloudinary = async (imageUri) => {
  const data = new FormData();

  data.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "profile.jpg",
  });

  data.append("upload_preset", "trip_planner");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dbyrgfhu9/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await response.json();

  return result.secure_url;
};

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

        {/* <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#6A40F4"
          />
        </TouchableOpacity> */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 110,
        }}
      >
        {/* PROFILE + STATS CARD */}
        <View style={styles.profileCard}>
          <View
  style={{
    alignItems: "center",
    marginTop: 10,
  }}
>
  <View
    style={{
      position: "relative",
    }}
  >
   {photoURL ? (
  <Image
    source={{
      uri: photoURL,
    }}
        style={{
          width: 140,
          height: 140,
          borderRadius: 70,
          borderWidth: 4,
          borderColor: "#2563EB",
        }}
      />
    ) : (
      <View
        style={{
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: "#EEE9FF",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 4,
          borderColor:"#2563EB",
        }}
      >
        <Ionicons
          name="person"
          size={70}
          color="#2563EB"
        />
      </View>
    )}

    <TouchableOpacity
      onPress={pickProfileImage}
      style={{
        position: "absolute",
        bottom: 5,
        right: 5,
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#fff",
      }}
    >
      <Ionicons
        name="pencil"
        size={18}
        color="#fff"
      />
    </TouchableOpacity>
  </View>

  <Text
    style={{
      marginTop: 15,
      fontSize: 24,
      fontWeight: "700",
      color: "#111",
    }}
  >
    {user?.displayName || "User"}
  </Text>

  <Text
    style={{
      marginTop: 5,
      fontSize: 15,
      color: "#777",
    }}
  >
    {user?.email || ""}
  </Text>
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
                color="#2563EB"
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