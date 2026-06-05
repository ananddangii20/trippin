import React, {
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  Text,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import TopHeader from "../components/TopHeader";
import TripCard from "../components/TripCard";
import BottomNavbar from "../components/BottomNavbar";

import styles from "../styles/TripsStyles";

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

export default function TripsScreen() {
  const [trips, setTrips] = useState([]);

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

  useEffect(() => {
    const q = query(
      collection(db, "trips"),
      where(
        "userId",
        "==",
        auth.currentUser.uid
      )
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {
        const data =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        console.log(data);

        setTrips(data);
      });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <TopHeader />

      <Text style={styles.title}>
        Your Trips
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        {trips.map((trip) => (
<TripCard
  key={trip.id}
  destination={trip.destination}
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
  budget={trip.budget || 0}
  collected={trip.collected || 0}
  progress={trip.progress || 0}
  status={getTripStatus(
    trip.startDate,
    trip.endDate
  )}
  image={require("../../assets/images/trip1.png")}
/>
        ))}
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
}