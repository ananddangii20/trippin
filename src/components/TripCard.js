import React, {
  useEffect,
  useRef,
} from "react";

import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import styles from "../styles/TripsStyles";

export default function TripCard({
  tripId,
   creatorId,
  destination,
  date,
  image,
  status,
  budget,
  collected,
  progress,
  members,
}) {
  const navigation = useNavigation();

  const pulseAnim = useRef(
    new Animated.Value(1)
  ).current;

  useEffect(() => {
    if (status === "Ongoing") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            pulseAnim,
            {
              toValue: 1.08,
              duration: 800,
              useNativeDriver: true,
            }
          ),
          Animated.timing(
            pulseAnim,
            {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }
          ),
        ])
      ).start();
    }
  }, [status]);

  const getBadgeStyle = () => {
    switch (status) {
      case "Upcoming":
        return {
          backgroundColor: "#e7effc",
        };

      case "Ongoing":
        return {
          backgroundColor: "#68bb8b",
        };

      case "Expired":
        return {
          backgroundColor: "#f06464",
        };

      default:
        return {
          backgroundColor: "#888",
        };
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "Upcoming":
        return "🗓 Upcoming";

      case "Ongoing":
        return "🔥 Ongoing";

      case "Expired":
        return "⏳ Expired";

      default:
        return status;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
       navigation.navigate(
  "TripDetails",
  {
    tripId,
     creatorId,
    title: destination,
    destination,
    date,
    image,
    status,
    budget,
    collected,
    progress,
    members,
  }
)
      }
    >
     <ImageBackground
  source={
    image
      ? { uri: image }
      : require("../../assets/images/trip1.png")
  }
  style={styles.card}
  imageStyle={styles.cardImage}
>
        <View style={styles.overlay}>
          <Text
            style={styles.cardTitle}
          >
            {destination}
          </Text>

          <Text
            style={styles.cardDate}
          >
            {date}
          </Text>

          <Animated.View
            style={[
              styles.badge,
              getBadgeStyle(),
              status ===
                "Ongoing" && {
                transform: [
                  {
                    scale:
                      pulseAnim,
                  },
                ],
              },
            ]}
          >
            <Text
              style={
                styles.badgeText
              }
            >
              {getStatusText()}
            </Text>
          </Animated.View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}