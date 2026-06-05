import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import styles from "../styles/TripsStyles";

export default function TripCard({
  title,
  date,
  image,
  status,
  budget,
  collected,
  progress,
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("TripDetails", {
          title,
          date,
          image,
          status,
          budget,
          collected,
          progress,
        })
      }
    >
      <ImageBackground
        source={image}
        style={styles.card}
        imageStyle={styles.cardImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.cardTitle}>
            {title}
          </Text>

          <Text style={styles.cardDate}>
            {date}
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {status}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}