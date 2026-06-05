import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import TripsScreen from "../screens/TripsScreen";
import TripDetailsScreen from "../screens/TripDetailsScreen";
import PhotosScreen from "../screens/PhotosScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

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
    </Stack.Navigator>
  );
}