import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

import styles from "../styles/ChatStyles";

export default function ChatScreen({
  route,
  navigation,
}) {
const {
  tripId,
  tripName = "Trip Chat",
} = route.params || {};


  const { user } = useAuth();

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const flatListRef = useRef();

  useEffect(() => {
    const q = query(
      collection(
        db,
        "trips",
        tripId,
        "chats"
      ),
      orderBy(
        "createdAt",
        "asc"
      )
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {
        const data =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setMessages(data);

        setTimeout(() => {
          flatListRef.current?.scrollToEnd(
            {
              animated: true,
            }
          );
        }, 100);
      });

    return unsubscribe;
  }, []);

  const sendMessage =
    async () => {
      if (
        !message.trim()
      ) {
        return;
      }

      await addDoc(
        collection(
          db,
          "trips",
          tripId,
          "chats"
        ),
        {
          text: message,
          senderId:
            user.uid,
          senderName:
            user.displayName ||
            "User",
          createdAt:
            serverTimestamp(),
        }
      );

      setMessage("");
    };

  const renderItem = ({
    item,
  }) => {
    const mine =
      item.senderId ===
      user.uid;

    return (
      <View
        style={[
          styles.messageContainer,
          mine
            ? styles.right
            : styles.left,
        ]}
      >
        {!mine && (
          <Text
            style={
              styles.username
            }
          >
            {
              item.senderName
            }
          </Text>
        )}

        <View
          style={[
            styles.bubble,
            mine
              ? styles.myBubble
              : styles.otherBubble,
          ]}
        >
          <Text
            style={
              styles.messageText
            }
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={
        styles.container
      }
    >
      <View
        style={
          styles.header
        }
      >
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="chevron-back"
            size={28}
          />
        </TouchableOpacity>

        <Text
          style={
            styles.title
          }
        >
          {tripName}
        </Text>

        <View
          style={{
            width: 28,
          }}
        />
      </View>

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={
          Platform.OS ===
          "ios"
            ? "padding"
            : null
        }
      >
        <FlatList
          ref={
            flatListRef
          }
          data={
            messages
          }
          renderItem={
            renderItem
          }
          keyExtractor={(
            item
          ) => item.id}
          contentContainerStyle={{
            padding: 15,
          }}
        />

        <View
          style={
            styles.inputRow
          }
        >
          <TextInput
            style={
              styles.input
            }
            value={
              message
            }
            onChangeText={
              setMessage
            }
            placeholder="Type a message..."
          />

          <TouchableOpacity
            style={
              styles.sendButton
            }
            onPress={
              sendMessage
            }
          >
            <Ionicons
              name="send"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}