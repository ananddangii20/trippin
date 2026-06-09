import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";

import {
  doc,
  onSnapshot,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import BottomNavbar from "../components/BottomNavbar";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/ProfileStyles";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({
  navigation,
}) {
  const { user, logout } = useAuth();

  const [profileData, setProfileData] =
    useState(null);

  const [photoURL, setPhotoURL] =
    useState("");

  const [stats, setStats] = useState({
    totalTrips: 0,
    mySpends: 0,
    tripsCompleted: 0,
  });

  useEffect(() => {
    if (!user?.uid) return;

    const userRef = doc(
      db,
      "users",
      user.uid
    );

    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        if (!snapshot.exists()) return;

        const data = snapshot.data();

        setProfileData(data);
        setPhotoURL(data.photoURL || "");
      }
    );

    return unsubscribe;
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = onSnapshot(
      collection(db, "trips"),
      (snapshot) => {
        let totalTrips = 0;
        let mySpends = 0;
        let tripsCompleted = 0;

        snapshot.docs.forEach((tripDoc) => {
          const trip = tripDoc.data();

          const members =
            trip.members || [];

          const isMyTrip =
            members.some((member) => {
              if (typeof member === "string") {
                return member === user.uid;
              }

              return (
                member.uid === user.uid &&
                member.status !== "left" &&
                member.status !== "removed"
              );
            }) ||
            trip.userId === user.uid;

          if (!isMyTrip) return;

          totalTrips += 1;

          const myPayment =
            trip.payments?.[user.uid];

          mySpends += Number(
            myPayment?.amount || 0
          );

          const endDate =
            trip.endDate
              ? new Date(trip.endDate)
              : null;

          if (
            endDate &&
            endDate < new Date()
          ) {
            tripsCompleted += 1;
          }
        });

        setStats({
          totalTrips,
          mySpends,
          tripsCompleted,
        });
      }
    );

    return unsubscribe;
  }, [user?.uid]);

  const uploadToCloudinary = async (
    imageUri
  ) => {
    const data = new FormData();

    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: `profile-${user.uid}.jpg`,
    });

    data.append(
      "upload_preset",
      "trip_planner"
    );

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dbyrgfhu9/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.error?.message ||
          "Cloudinary upload failed"
      );
    }

    return result.secure_url;
  };

  const pickProfileImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow photo access."
      );
      return;
    }

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
      const imageUrl =
        await uploadToCloudinary(
          result.assets[0].uri
        );

      await setDoc(
        doc(db, "users", user.uid),
        {
          photoURL: imageUrl,
          updatedAt:
            new Date().toISOString(),
        },
        {
          merge: true,
        }
      );

      setPhotoURL(imageUrl);

      Alert.alert(
        "Success",
        "Profile photo updated"
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error.message ||
          "Failed to upload image"
      );
    }
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
          onPress: logout,
        },
      ]
    );
  };

  const menuItems = [
    {
      title: "My Trips",
      icon: "airplane-outline",
      onPress: () =>
        navigation.navigate("Trips"),
    },
    {
      title: "Settings",
      icon: "settings-outline",
      onPress: () =>
        Alert.alert("Coming Soon"),
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Profile
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 110,
        }}
      >
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
                  source={{ uri: photoURL }}
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
                    borderColor: "#2563EB",
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
              {profileData?.username ||
                user?.displayName ||
                "User"}
            </Text>

            <Text
              style={{
                marginTop: 5,
                fontSize: 15,
                color: "#777",
              }}
            >
              {profileData?.email ||
                user?.email ||
                ""}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {stats.totalTrips}
              </Text>
              <Text style={styles.statLabel}>
                Total Trips
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                ₹{stats.mySpends}
              </Text>
              <Text style={styles.statLabel}>
                My Spends
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {stats.tripsCompleted}
              </Text>
              <Text style={styles.statLabel}>
                Trips Complete
              </Text>
            </View>
          </View>
        </View>

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