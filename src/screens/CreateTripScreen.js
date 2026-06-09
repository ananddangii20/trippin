import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
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

import * as ImagePicker from "expo-image-picker";
 const { width, height } = Dimensions.get("window");


export default function CreateTripScreen({
  navigation,
}) {

 


  const [destination, setDestination] =
    useState("");
  const [budget, setBudget] =
    useState("");

    const [image, setImage] =
  useState(null);

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

  const pickImage = async () => {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Permission Required",
      "Please allow gallery access."
    );
    return;
  }

const result =
  await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [16, 9],
    quality: 0.6,
  });


  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

const uploadImageToCloudinary =
  async () => {
    if (!image) return null;

    const formData = new FormData();

    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "trip.jpg",
    });

    formData.append(
      "upload_preset",
      "trip_planner"
    );

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dbyrgfhu9/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data =
      await response.json();

    return data.secure_url;
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
  const imageUrl =
    await uploadImageToCloudinary();

  await addDoc(
  collection(db, "trips"),
  {
    title: destination,
    destination,
    coverImage: imageUrl,
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
    
<ImageBackground
  source={require("../../assets/images/home-bg.png")}
  style={styles.background}
>
  <View style={styles.overlayScreen}>
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

  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingBottom: 40,
    }}
  >
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
             Start Date •{" "}
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
            End Date •{" "}
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
  style={styles.uploadButton}
  onPress={pickImage}
>
  <Text style={styles.uploadText}>
    {image
  ? "📷 Change Selected Image"
  : "📷 Upload Cover Image"}
  </Text>
</TouchableOpacity>

{image && (
  <>
    <Image
      source={{ uri: image }}
      style={styles.previewImage}
    />

    <TouchableOpacity
      style={styles.removeImageButton}
      onPress={() => setImage(null)}
    >
      <Text style={styles.removeImageText}>
        Remove Image
      </Text>
    </TouchableOpacity>
  </>
)}

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
        </ScrollView>


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
      </View>
</ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: width * 0.05,
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlayScreen: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.78)",
  },

  backBtn: {
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: width * 0.055,

    backgroundColor: "rgba(255,255,255,0.95)",

    justifyContent: "center",
    alignItems: "center",

    marginTop: height * 0.01,
zIndex: 9999,
    elevation: 3,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: height * 0.015,
  },

  logo: {
    width: width * 0.5,
    height: width * 0.22,
    transform:[{scale:2}],
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.88)",

    borderRadius: width * 0.06,

    padding: width * 0.055,

    elevation: 6,
  },

  heading: {
    fontSize: width * 0.065,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: height * 0.025,
  },

  input: {
    minHeight: height * 0.07,

    backgroundColor: "#FFFFFF",

    borderWidth: 1.5,
    borderColor: "#DCEBFF",

    borderRadius: width * 0.04,

    paddingHorizontal: width * 0.04,

    justifyContent: "center",

    marginBottom: height * 0.018,

    fontSize: width * 0.04,

    color: "#1E293B",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.02,
  },

  dateText: {
    color: "#1E293B",
    fontSize: width * 0.038,
    fontWeight: "500",
  },

  button: {
    height: height * 0.07,

    backgroundColor: "#2563EB",

    borderRadius: width * 0.04,

    justifyContent: "center",
    alignItems: "center",

    marginTop: height * 0.012,

    elevation: 6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.042,
    fontWeight: "700",
  },

  calendarContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: width * 0.06,
    overflow: "hidden",
    padding: width * 0.025,
  },

  uploadButton: {
    height: height * 0.07,

    borderRadius: width * 0.04,

    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#2563EB",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: height * 0.02,

    backgroundColor: "#F8FBFF",
  },

  uploadContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.02,
  },

  uploadText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: width * 0.038,
  },

  previewImage: {
    width: "100%",
    height: width * 0.5,
    borderRadius: width * 0.04,
    marginBottom: height * 0.02,
  },

  removeImageButton: {
    backgroundColor: "#FFF1F2",

    borderRadius: width * 0.035,

    paddingVertical: height * 0.018,

    alignItems: "center",

    marginBottom: height * 0.02,
  },

  removeImageText: {
    color: "#DC2626",
    fontWeight: "600",
    fontSize: width * 0.038,
  },
});