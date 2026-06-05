import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
 
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import {
  VideoView,
  useVideoPlayer,
} from "expo-video";

import styles from "../styles/PhotosStyles";

export default function PhotosScreen({
  navigation,
}) {
  const [activeTab, setActiveTab] =
    useState("Photos");

  const photos = [
    require("../../assets/images/gallery1.webp"),
    require("../../assets/images/gallery2.webp"),
    require("../../assets/images/gallery3.webp"),
    require("../../assets/images/gallery4.webp"),
    require("../../assets/images/gallery5.webp"),
    require("../../assets/images/gallery6.webp"),
    require("../../assets/images/gallery7.webp"),
    require("../../assets/images/gallery8.webp"),
    require("../../assets/images/gallery9.webp"),
  ];

  const videoPlayer = useVideoPlayer(
    require("../../assets/videos/trip-video.mp4"),
    (player) => {
      player.loop = true;
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="chevron-back"
            size={26}
            color="#222"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Photos
        </Text>
      </View>

      {/* Filters */}

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            activeTab === "All" &&
              styles.activeFilter,
          ]}
          onPress={() =>
            setActiveTab("All")
          }
        >
          <Text
            style={[
              styles.filterText,
              activeTab === "All" &&
                styles.activeText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            activeTab === "Photos" &&
              styles.activeFilter,
          ]}
          onPress={() =>
            setActiveTab("Photos")
          }
        >
          <Text
            style={[
              styles.filterText,
              activeTab === "Photos" &&
                styles.activeText,
            ]}
          >
            Photos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            activeTab === "Videos" &&
              styles.activeFilter,
          ]}
          onPress={() =>
            setActiveTab("Videos")
          }
        >
          <Text
            style={[
              styles.filterText,
              activeTab === "Videos" &&
                styles.activeText,
            ]}
          >
            Videos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Gallery */}

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {(activeTab === "All" ||
            activeTab === "Photos") &&
            photos.map((item, index) => (
              <Image
                key={index}
                source={item}
                style={styles.image}
              />
            ))}
        </View>

        {(activeTab === "All" ||
          activeTab === "Videos") && (
          <View
            style={styles.videoContainer}
          >
            <VideoView
              player={videoPlayer}
              style={styles.video}
              nativeControls
              allowsFullscreen
            />
          </View>
        )}
      </ScrollView>

      {/* Floating Button */}

      <TouchableOpacity
        style={styles.fab}
      >
        <Ionicons
          name="add"
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}