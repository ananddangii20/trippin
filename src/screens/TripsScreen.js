import React, {
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import TopHeader from "../components/TopHeader";
import TripCard from "../components/TripCard";
import BottomNavbar from "../components/BottomNavbar";

import styles from "../styles/TripsStyles";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { auth, db } from "../services/firebase";

import { Ionicons } from "@expo/vector-icons";

export default function TripsScreen() {
  const [trips, setTrips] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const getTripStatus = (
    startDate,
    endDate
  ) => {
    if (!startDate || !endDate) {
      return "Upcoming";
    }

    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) {
      return "Upcoming";
    }

    if (
      today >= start &&
      today <= end
    ) {
      return "Ongoing";
    }

    return "Expired";
  };

  const isUserInTrip = (
    trip,
    userId
  ) => {
    if (!userId) return false;

    if (trip.userId === userId) {
      return true;
    }

    const members =
      trip.members || [];

    return members.some((member) => {
      if (typeof member === "string") {
        return member === userId;
      }

      return (
        member.uid === userId &&
        member.status !== "left" &&
        member.status !== "removed"
      );
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "trips"),
      (snapshot) => {
        const userId =
          auth.currentUser?.uid;

        if (!userId) {
          setTrips([]);
          return;
        }

        const data = snapshot.docs
          .map((tripDoc) => ({
            id: tripDoc.id,
            ...tripDoc.data(),
          }))
          .filter((trip) =>
            isUserInTrip(
              trip,
              userId
            )
          );

        setTrips(data);
      }
    );

    return unsubscribe;
  }, []);

  const filteredTrips =
    trips.filter((trip) =>
      (
        trip.destination ||
        trip.title ||
        ""
      )
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <ImageBackground
      source={require("../../assets/images/home-bg.png")}
      style={styles.background}
    >
      <View
        style={
          styles.overlayScreen
        }
      >
        <SafeAreaView
          style={styles.container}
        >
          <TopHeader />

          <Text
            style={styles.title}
          >
            
          </Text>

          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 18,
              backgroundColor:
                "#fff",
              borderRadius: 16,
              borderWidth: 1,
              borderColor:
                "#E5E7EB",
              height: 52,
              flexDirection:
                "row",
              alignItems:
                "center",
              paddingHorizontal: 14,
            }}
          >
            <Ionicons
              name="search"
              size={20}
              color="#94A3B8"
            />

            <TextInput
              placeholder="Search trips..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={
                setSearch
              }
              style={{
                flex: 1,
                marginLeft: 10,
                fontSize: 15,
                color:
                  "#111827",
                fontWeight:
                  "600",
              }}
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
          >
            {filteredTrips.length >
            0 ? (
              filteredTrips.map(
                (trip) => (
                  <TripCard
                    key={
                      trip.id
                    }
                    creatorId={
                      trip.userId
                    }
                    tripId={
                      trip.id
                    }
                    destination={
                      trip.destination ||
                      trip.title ||
                      "Trip"
                    }
                    date={
                      trip.startDate &&
                      trip.endDate
                        ? `${new Date(
                            trip.startDate
                          ).toLocaleDateString()} - ${new Date(
                            trip.endDate
                          ).toLocaleDateString()}`
                        : "No dates selected"
                    }
                    budget={
                      trip.budget ||
                      0
                    }
                    collected={
                      trip.collected ||
                      0
                    }
                    progress={
                      trip.progress ||
                      0
                    }
                    members={
                      trip.members ||
                      []
                    }
                    status={getTripStatus(
                      trip.startDate,
                      trip.endDate
                    )}
                    image={
                      trip.coverImage
                    }
                  />
                )
              )
            ) : (
              <View
                style={{
                  alignItems:
                    "center",
                  marginTop: 80,
                }}
              >
                <Ionicons
                  name="airplane-outline"
                  size={70}
                  color="#CBD5E1"
                />

                <Text
                  style={{
                    marginTop: 15,
                    fontSize: 18,
                    fontWeight:
                      "700",
                    color:
                      "#475569",
                  }}
                >
                  No trips found
                </Text>

                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 14,
                    color:
                      "#94A3B8",
                  }}
                >
                  Try another search
                </Text>
              </View>
            )}
          </ScrollView>

          <BottomNavbar />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}