import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../services/firebase";

export default function CreateTripScreen({
  navigation,
}) {
  const [destination, setDestination] =
    useState("");
  const [budget, setBudget] =
    useState("");

  const [startDate, setStartDate] =
    useState(new Date());

  const [endDate, setEndDate] =
    useState(new Date());

  const [calendarVisible, setCalendarVisible] =
    useState(false);

  const [selecting, setSelecting] =
    useState("start");

  const formatDate = (date) => {
    const day = String(
      date.getDate()
    ).padStart(2, "0");

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const year =
      date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getStatus = () => {
    const today = new Date();

    if (today < startDate) {
      return "Upcoming";
    }

    if (
      today >= startDate &&
      today <= endDate
    ) {
      return "Ongoing";
    }

    return "Expired";
  };

  const createTrip = async () => {
    if (
      !destination.trim() ||
      !budget.trim()
    ) {
      Alert.alert(
        "Missing Fields",
        "Please fill all fields"
      );
      return;
    }

    if (endDate < startDate) {
      Alert.alert(
        "Invalid Date",
        "End date cannot be before Start Date"
      );
      return;
    }

    try {
     await addDoc(
  collection(db, "trips"),
  {
    title: destination,
    destination,
    budget: Number(budget),
    collected: 0,
    progress: 0,

    startDate:
      startDate.toISOString(),

    endDate:
      endDate.toISOString(),

    status: getStatus(),

    userId:
      auth.currentUser.uid,

    members: [
      auth.currentUser.uid,
    ],

    createdAt:
      serverTimestamp(),
  }
);

      Alert.alert(
        "Success",
        "Trip Created Successfully"
      );

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error",
        error.message
      );
    }
  };

  const selectedDateString =
    selecting === "start"
      ? startDate
          .toISOString()
          .split("T")[0]
      : endDate
          .toISOString()
          .split("T")[0];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() =>
          navigation.navigate("Trips")
        }
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color="#7C4DFF"
        />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Create New Trip
        </Text>

        {/* <TextInput
          placeholder="Trip Name"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        /> */}

        <TextInput
          placeholder="Destination"
          placeholderTextColor="#888"
          value={destination}
          onChangeText={setDestination}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            setSelecting("start");
            setCalendarVisible(true);
          }}
        >
          <Text style={styles.dateText}>
            📅 Start Date •{" "}
            {formatDate(startDate)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            setSelecting("end");
            setCalendarVisible(true);
          }}
        >
          <Text style={styles.dateText}>
            📅 End Date •{" "}
            {formatDate(endDate)}
          </Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Budget ₹"
          keyboardType="numeric"
          placeholderTextColor="#888"
          value={budget}
          onChangeText={setBudget}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={createTrip}
        >
          <Text
            style={styles.buttonText}
          >
            Create Trip
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={calendarVisible}
        onBackdropPress={() =>
          setCalendarVisible(false)
        }
      >
        <View
          style={styles.calendarContainer}
        >
          <Calendar
            markedDates={{
              [selectedDateString]: {
                selected: true,
                selectedColor:
                  "#7C4DFF",
              },
            }}
            onDayPress={(day) => {
              const pickedDate =
                new Date(
                  day.dateString
                );

              if (
                selecting ===
                "start"
              ) {
                setStartDate(
                  pickedDate
                );
              } else {
                setEndDate(
                  pickedDate
                );
              }

              setCalendarVisible(
                false
              );
            }}
            theme={{
              todayTextColor:
                "#7C4DFF",
              arrowColor:
                "#7C4DFF",
              selectedDayBackgroundColor:
                "#7C4DFF",
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },

backBtn: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: "#F5F3FF",

  justifyContent: "center",
  alignItems: "center",

  marginTop: 10,

  zIndex: 9999,
  elevation: 20,
},
  logoContainer: {
    alignItems: "center",
    marginBottom: 15,
  },

  logo: {
    width: 120,
    height: 120,
    transform: [{ scale: 3 }],
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#F3F4F6",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    height: 56,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    justifyContent: "center",
    marginBottom: 14,
  },

  dateText: {
    color: "#111827",
    fontSize: 15,
  },

  button: {
    height: 58,
    backgroundColor: "#7C4DFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,

    shadowColor: "#7C4DFF",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  calendarContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    padding: 10,
  },
});