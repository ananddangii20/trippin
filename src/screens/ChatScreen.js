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
  Alert,
  ImageBackground,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import {
  doc,
  updateDoc,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  getDocs,
  arrayUnion,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

import styles from "../styles/ChatStyles";

import {
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

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

  const [replyTo, setReplyTo] =
    useState(null);

  const flatListRef = useRef();

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({
          animated: true,
        });
      }, 150);
    }
  }, [messages]);

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
      onSnapshot(
        q,
        (snapshot) => {

          const data =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setMessages(data);
        }
      );

    return unsubscribe;

  }, []);

  useEffect(() => {

    const markSeen =
      async () => {

        const snapshot =
          await getDocs(
            collection(
              db,
              "trips",
              tripId,
              "chats"
            )
          );

        snapshot.forEach(
          async (msg) => {

            const data =
              msg.data();

            if (
              !data.seenBy?.includes(
                user.uid
              )
            ) {

              await updateDoc(
                msg.ref,
                {
                  seenBy:
                    arrayUnion(
                      user.uid
                    ),
                }
              );

            }

          }
        );

      };

    if (
      messages.length > 0
    ) {
      markSeen();
    }

  }, [messages]);

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

          deleted: false,

          seenBy: [
            user.uid
          ],

          replyTo:
            replyTo
              ? {
                text:
                  replyTo.text,
                senderName:
                  replyTo.senderName,
              }
              : null,

        }
      );

      setMessage("");
      setReplyTo(null);

    };

  const unsendMessage =
    async (id) => {

      await updateDoc(
        doc(
          db,
          "trips",
          tripId,
          "chats",
          id
        ),
        {
          deleted: true,
          text: "",
        }
      );

    };

  const renderItem = ({ item }) => {
    const mine =
      item.senderId ===
      user.uid;

    return (

      <PanGestureHandler
        activeOffsetX={[-80, 80]}
        failOffsetY={[-20, 20]}
        onHandlerStateChange={(e) => {

          if (
            e.nativeEvent.state === State.END &&
            Math.abs(
              e.nativeEvent.translationX
            ) > 80
          ) {
            setReplyTo(item);
          }

        }}
      >

        <View

          style={[

            styles.messageContainer,

            mine
              ?
              styles.right
              :
              styles.left,

          ]}

        >
          {!mine && (
            <Text
              style={styles.username}
            >
              {item.senderName}
            </Text>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            onLongPress={() => {
              if (
                item.senderId ===
                user.uid
              ) {
                Alert.alert(
                  "Message",
                  "Choose an action",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Unsend",
                      style: "destructive",
                      onPress: () =>
                        unsendMessage(
                          item.id
                        ),
                    },
                  ]
                );
              }
            }}
          >
            <View
              style={[
                styles.bubble,
                mine
                  ? styles.myBubble
                  : styles.otherBubble,
              ]}
            >

              {
                item.replyTo && (

                  <View
                    style={{

                      backgroundColor:
                        mine
                          ? "rgba(255,255,255,0.15)"
                          : "#ECECEC",

                      padding: 8,

                      borderRadius: 10,

                      marginBottom: 8,

                    }}
                  >

                    <Text
                      style={{
                        fontWeight: "700",
                        color: "#7C4DFF",
                        marginBottom: 5,
                      }}
                    >

                      ↩ Replying to
                      {" "}
                      {item.replyTo?.senderName}

                    </Text>

                    <Text
                      numberOfLines={1}

                      style={{

                        fontSize: 12,

                        color:
                          mine
                            ? "#F5F5F5"
                            : "#555",

                      }}

                    >

                      {item.replyTo?.text}

                    </Text>

                  </View>

                )
              }
              <Text
                style={[
                  styles.messageText,

                  mine
                    ? styles.myMessage
                    : styles.otherMessage,

                  item.deleted && {
                    fontStyle: "italic",
                    opacity: 0.7,
                  },
                ]}
              >
                {item.deleted
                  ? mine
                    ? "You unsent a message"
                    : "This message was unsent"
                  : item.text}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginTop: 5,
                }}
              >

                <Text
                  style={[
                    styles.time,
                    mine
                      ? styles.myTime
                      : styles.otherTime,
                  ]}
                >
                  {item.createdAt
                    ? item.createdAt
                      .toDate()
                      .toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : ""}
                </Text>

                {
                  mine && (

                    <Ionicons
                      name={
                        item.seenBy?.length > 1
                          ? "checkmark-done"
                          : "checkmark"
                      }
                      size={14}
                      color={
                        item.seenBy?.length > 1
                          ? "#4FC3F7"
                          : "#DDD"
                      }
                      style={{
                        marginLeft: 4,
                      }}
                    />

                  )

                }

              </View>
            </View>
          </TouchableOpacity>
        </View>

      </PanGestureHandler>
    );
  };


  return (
    <ImageBackground
      source={require("../../assets/images/home-bg.png")}
      style={styles.background}
    >
      <View style={styles.overlayScreen}>
        <SafeAreaView style={styles.container}>

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
            style={{ flex: 1 }}
            behavior={
              Platform.OS === "ios"
                ? "padding"
                : "height"
            }
            keyboardVerticalOffset={
              Platform.OS === "ios"
                ? 10
                : 20
            }
          >
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}

              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}

              contentContainerStyle={{
                padding: 15,
                paddingBottom: 20,
              }}


            />

            {
              replyTo && (

                <View
                  style={{

                    backgroundColor: "#F3F4F6",

                    marginHorizontal: 10,

                    padding: 12,

                    borderRadius: 12,

                    marginBottom: 8,

                  }}
                >

                  <Text
                    style={{

                      fontWeight: "700",

                      color: "#7C4DFF",

                    }}
                  >

                    Replying to
                    {replyTo.senderName}

                  </Text>

                  <Text
                    numberOfLines={1}
                  >

                    {replyTo.text}

                  </Text>

                  <TouchableOpacity

                    style={{

                      position: "absolute",

                      right: 10,

                      top: 10,

                    }}

                    onPress={() =>
                      setReplyTo(
                        null
                      )
                    }

                  >

                    <Ionicons
                      name="close"
                      size={20}
                    />

                  </TouchableOpacity>

                </View>

              )
            }
            <View
              style={
                styles.inputRow
              }
            >
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Message..."
                multiline
                returnKeyType="send"
                onSubmitEditing={() => {
                  if (message.trim()) {
                    sendMessage();
                  }
                }}
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
      </View>
    </ImageBackground>
  );
}