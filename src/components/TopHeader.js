import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../services/firebase";

import styles from "../styles/TripsStyles";

export default function TopHeader() {
  const navigation = useNavigation();

  const [unreadCount, setUnreadCount] =
    useState(0);

  useEffect(() => {
    const userId =
      auth.currentUser?.uid;

    if (!userId) return;

    const q = query(
      collection(db, "notifications"),
      where("receiverUid", "==", userId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const unread =
          snapshot.docs.filter((docSnap) => {
            const data = docSnap.data();

            return (
              data.status === "pending" ||
              data.read === false
            );
          });

        setUnreadCount(unread.length);
      }
    );

    return unsubscribe;
  }, []);

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

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Notifications")
          }
          style={{
            position: "relative",
          }}
        >
          <Ionicons
            name={
              unreadCount > 0
                ? "notifications"
                : "notifications-outline"
            }
            size={28}
            color={
              unreadCount > 0
                ? "#EF4444"
                : "#1E293B"
            }
          />

          {unreadCount > 0 && (
            <View
              style={{
                position: "absolute",
                top: -6,
                right: -8,
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: "#EF4444",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
                borderColor: "#fff",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: "900",
                }}
              >
                {unreadCount > 9
                  ? "9+"
                  : unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}