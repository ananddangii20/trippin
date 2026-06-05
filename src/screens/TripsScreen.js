import React from "react";
import {
  
  ScrollView,
  Text,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import TopHeader from "../components/TopHeader";
import TripCard from "../components/TripCard";
import BottomNavbar from "../components/BottomNavbar";

import styles from "../styles/TripsStyles";

export default function TripsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopHeader />

      <Text style={styles.title}>
        Your Trips
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <TripCard
  title="Goa Getaway 🌴"
  date="12 - 16 June, 2026"
  image={require("../../assets/images/trip1.png")}
  status="Upcoming"
  budget={60000}
  collected={45000}
  progress={75}
/>

<TripCard
  title="Kasol Trek 🏔️"
  date="2 - 6 July, 2026"
  image={require("../../assets/images/trip2.png")}
  status="Upcoming"
  budget={25000}
  collected={18000}
  progress={72}
/>

<TripCard
  title="Manali Roadtrip 🚗"
  date="5 - 9 Aug, 2026"
  image={require("../../assets/images/trip3.png")}
  status="Upcoming"
  budget={40000}
  collected={30000}
  progress={75}
/>
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
}