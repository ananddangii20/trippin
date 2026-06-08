import React from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

import TripsScreen from "../screens/TripsScreen";
import TripDetailsScreen from "../screens/TripDetailsScreen";
import PhotosScreen from "../screens/PhotosScreen";
import GalleryScreen from "../screens/GalleryScreen";
import VideoGalleryScreen from "../screens/VideoGalleryScreen";
import CreateTripScreen from "../screens/CreateTripScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import AddMembersScreen from "../screens/AddMembersScreen";
import ViewMembersScreen from "../screens/ViewMembersScreen";
import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}

export default function AppNavigator() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen
            name="Trips"
            component={TripsScreen}
          />

          <Stack.Screen
            name="TripDetails"
            component={TripDetailsScreen}
          />

          <Stack.Screen
            name="Photos"
            component={PhotosScreen}
          />

          <Stack.Screen
  name="Gallery"
  component={
    GalleryScreen
  }
/>

<Stack.Screen
  name="VideoGallery"
  component={
    VideoGalleryScreen
  }
/>

         <Stack.Screen
  name="CreateTrip"
  component={CreateTripScreen}
/>

<Stack.Screen
  name="Chat"
  component={ChatScreen}
/>

<Stack.Screen
  name="Profile"
  component={ProfileScreen}
/>
<Stack.Screen
  name="AddMembers"
  component={AddMembersScreen}
/>
<Stack.Screen
  name="ViewMembers"
  component={ViewMembersScreen}
/>
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />

          <Stack.Screen
            name="Signup"
            component={SignupScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}