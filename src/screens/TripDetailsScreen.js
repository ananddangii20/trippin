import React from "react";
import {
View,
Text,
Image,
ImageBackground,

TouchableOpacity,
ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/TripDetailsStyles";
import BottomNavbar from "../components/BottomNavbar";

export default function TripDetailsScreen({
route,
navigation,
}) {
const {
title = "Trip",
date = "",
image,
budget = 0,
collected = 0,
progress = 0,
} = route.params || {};

return ( <SafeAreaView style={styles.container}>
{/* Header */}


  <View style={styles.header}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
    >
      <Ionicons
        name="chevron-back"
        size={28}
        color="#222"
      />
    </TouchableOpacity>

    <View style={styles.headerCenter}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.date}>
        {date}
      </Text>
    </View>

    <TouchableOpacity>
      <Ionicons
        name="ellipsis-vertical"
        size={24}
        color="#222"
      />
    </TouchableOpacity>
  </View>

  <ScrollView
    showsVerticalScrollIndicator={false}
  >
    {/* Hero Image */}

    <ImageBackground
      source={image}
      style={styles.heroImage}
      imageStyle={styles.heroImageRadius}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../assets/images/user1.png")}
          style={styles.avatar}
        />

        <Image
          source={require("../../assets/images/user2.png")}
          style={[
            styles.avatar,
            { marginLeft: -12 },
          ]}
        />

        <Image
          source={require("../../assets/images/user3.png")}
          style={[
            styles.avatar,
            { marginLeft: -12 },
          ]}
        />

        <View style={styles.moreAvatar}>
          <Text style={styles.moreText}>
            +3
          </Text>
        </View>
      </View>
    </ImageBackground>

    {/* Budget Card */}

    <View style={styles.budgetCard}>
      <View>
        <Text style={styles.cardLabel}>
          Trip Budget
        </Text>

        <Text style={styles.bigText}>
          ₹{budget.toLocaleString()}
        </Text>
      </View>

      <View>
        <Text style={styles.cardLabel}>
          Collected
        </Text>

        <Text style={styles.greenText}>
          ₹{collected.toLocaleString()}
        </Text>
      </View>
    </View>

    {/* Progress */}

    <View style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>
          Budget Progress
        </Text>

        <Text style={styles.progressPercent}>
          {progress}%
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>
    </View>

    {/* Quick Actions */}

    <View style={styles.actionContainer}>
<TouchableOpacity
  style={styles.actionItem}
  onPress={() =>
    navigation.navigate("Photos")
  }
>
        <Ionicons
          name="chatbubble"
          size={26}
          color="#7C4DFF"
        />
        <Text style={styles.actionText}>
          Chat
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionItem}
      >
        <Ionicons
          name="wallet"
          size={26}
          color="#7C4DFF"
        />
        <Text style={styles.actionText}>
          Expenses
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionItem}
      >
        <Ionicons
          name="bed"
          size={26}
          color="#7C4DFF"
        />
        <Text style={styles.actionText}>
          Stay
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionItem}
      >
        <Ionicons
          name="map"
          size={26}
          color="#F59E0B"
        />
        <Text style={styles.actionText}>
          Plan
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.actionItem}
  onPress={() =>
    navigation.navigate("Photos")
  }
>
  <Ionicons
    name="camera"
    size={26}
    color="#7C4DFF"
  />
  <Text style={styles.actionText}>
    Photos
  </Text>
</TouchableOpacity>
    </View>

    {/* Upcoming */}

    <View style={styles.timelineContainer}>
      <View style={styles.timelineHeader}>
        <Text style={styles.sectionTitle}>
          Upcoming
        </Text>

        <TouchableOpacity>
          <Text style={styles.viewAll}>
            View all
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timelineItem}>
        <View style={styles.timelineDot} />

        <View style={styles.timelineContent}>
          <Text style={styles.timelineTime}>
            12 Jun • 2:00 PM
          </Text>

          <Text style={styles.timelineTitle}>
            Check-in at Hotel Ocean View
          </Text>
        </View>
      </View>

      <View style={styles.timelineItem}>
        <View style={styles.timelineDot} />

        <View style={styles.timelineContent}>
          <Text style={styles.timelineTime}>
            13 Jun • 4:00 PM
          </Text>

          <Text style={styles.timelineTitle}>
            Calangute Beach Visit
          </Text>
        </View>
      </View>

      <View style={styles.timelineItem}>
        <View style={styles.timelineDot} />

        <View style={styles.timelineContent}>
          <Text style={styles.timelineTime}>
            13 Jun • 9:00 PM
          </Text>

          <Text style={styles.timelineTitle}>
            Dinner at Britto's
          </Text>
        </View>
      </View>
    </View>
  </ScrollView>

  <BottomNavbar activeTab="Trips" />
</SafeAreaView>


);
}
