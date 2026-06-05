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

export default function SignupScreen({ navigation }) {
  const { signup, loginWithGoogleToken, user } = useAuth();
const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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

  async function handleSignup() {
    setError("");

   if (!username || !email || !password) {
  setError(
    "Enter your username, email, and password."
  );
  return;
}

    if (password.length < 6) {
      setError(
        "Password should be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);
   await signup(username, email, password);
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

          <Text style={styles.title}>
            Create account
          </Text>
          <Text style={styles.subtitle}>
            Start planning trips with your favorite
            people.
          </Text>

          <View style={styles.form}>
           <TextInput
  style={styles.input}
  value={username}
  onChangeText={(text) =>
    setUsername(
      text
        .toLowerCase()
        .replace(/[^a-z0-9._]/g, "")
    )
  }
  placeholder="Username"
  autoCapitalize="none"
/>

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
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
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  Sign up
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
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Login")
              }
            >
              <Text style={styles.switchLink}>
                Login
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
    case "auth/email-already-in-use":
      return "This email already has an account.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
      case "auth/username-already-in-use":
  return "Username already taken.";
    default:
      return error?.message || "Signup failed.";
  }
}
