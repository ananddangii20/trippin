import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../context/AuthContext";
import { getGoogleIdToken } from "../services/googleSignIn";
import styles from "../styles/AuthStyles";

export default function LoginScreen({ navigation }) {
  const { login, loginWithGoogleToken, user } = useAuth();
const [identifier, setIdentifier] =
  useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Trips" }],
      });
    }
  }, [user, navigation]);

  async function handleLogin() {
    setError("");

   if (!identifier || !password) {
  setError(
    "Enter username/email and password."
  );
  return;
}

    try {
      setLoading(true);
   await login(identifier, password);
    } catch (authError) {
      setError(getAuthMessage(authError));
    } finally {
      setLoading(false);
    }
  }

  async function handleGooglePress() {
    setError("");

    try {
      setLoading(true);
      const idToken = await getGoogleIdToken();
      await loginWithGoogleToken(idToken);
    } catch (authError) {
      setError(getAuthMessage(authError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/images/home-bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color="#222"
            />
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Log in and keep planning better trips
            together.
          </Text>

          <View style={styles.form}>
      <TextInput
  style={styles.input}
  value={identifier}
  onChangeText={setIdentifier}
  placeholder="Username or Email"
  autoCapitalize="none"
/>

            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />

            {error ? (
              <Text style={styles.error} selectable>
                {error}
              </Text>
            ) : null}

            <TouchableOpacity
              style={[
                styles.button,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  Login
                </Text>
              )}
            </TouchableOpacity>

            <Text style={styles.divider}>or</Text>

            <TouchableOpacity
              style={[
                styles.googleButton,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleGooglePress}
              disabled={loading}
            >
              <Ionicons
                name="logo-google"
                size={20}
                color="#5B35F2"
              />
              <Text style={styles.googleText}>
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>
              New to Trippin?
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Signup")
              }
            >
              <Text style={styles.switchLink}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

function getAuthMessage(error) {
  switch (error?.code) {
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password is incorrect.";
    case "auth/user-data-not-found":
      return "No saved user data found. Please create an account first.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    default:
      return error?.message || "Login failed.";
  }
}
