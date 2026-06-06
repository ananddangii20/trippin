import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import {
  db,
} from "../services/firebase";

import {
  doc,
  onSnapshot,
  collection,
  getDocs,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";

export default function ViewMembersScreen({
  route,
  navigation,
}) {
  const { tripId } =
    route.params;

  const { user } =
    useAuth();

  const [members,
    setMembers] =
    useState([]);

  const [creatorId,
    setCreatorId] =
    useState("");

  useEffect(() => {
    const unsubscribe =
      onSnapshot(
        doc(
          db,
          "trips",
          tripId
        ),
        async (
          snapshot
        ) => {
          if (
            !snapshot.exists()
          )
            return;

          const trip =
            snapshot.data();

          setCreatorId(
            trip.userId
          );

          const users =
            await getDocs(
              collection(
                db,
                "users"
              )
            );

          const list =
            users.docs
              .map(
                (
                  doc
                ) => ({
                  id: doc.id,
                  ...doc.data(),
                })
              )
              .filter(
                (
                  item
                ) =>
                  trip.members?.includes(
                    item.uid
                  )
              );

          setMembers(
            list
          );
        }
      );

    return unsubscribe;
  }, []);

  const removeMember =
    (
      uid
    ) => {
      Alert.alert(
        "Remove Member",
        "Remove this member?",
        [
          {
            text:
              "Cancel",
          },
          {
            text:
              "Remove",
            style:
              "destructive",
            onPress:
              async () => {
                await updateDoc(
                  doc(
                    db,
                    "trips",
                    tripId
                  ),
                  {
                    members:
                      arrayRemove(
                        uid
                      ),
                  }
                );
              },
          },
        ]
      );
    };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          "#fff",
      }}
    >
      <View
        style={{
          flexDirection:
            "row",
          alignItems:
            "center",
          padding: 20,
        }}
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
          style={{
            fontSize: 22,
            fontWeight:
              "700",
            marginLeft: 15,
          }}
        >
          Members
        </Text>
      </View>

      <Text
        style={{
          marginLeft: 20,
          marginBottom: 15,
          color: "#666",
        }}
      >
        {members.length}
        {" "}
        Members
      </Text>

      <FlatList
        data={
          members
        }
        keyExtractor={(
          item
        ) =>
          item.uid
        }
        renderItem={({
          item,
        }) => (
          <View
            style={{
              flexDirection:
                "row",
              alignItems:
                "center",
              justifyContent:
                "space-between",
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor:
                "#eee",
            }}
          >
            <View
              style={{
                flexDirection:
                  "row",
                alignItems:
                  "center",
              }}
            >
              <Image
                source={{
                  uri:
                    item.photoURL ||
                    "https://ui-avatars.com/api/?name=" +
                      item.username,
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 15,
                }}
              />

              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight:
                      "600",
                  }}
                >
                  {
                    item.username
                  }
                </Text>

                {
                  item.uid ===
                    creatorId && (
                    <Text
                      style={{
                        color:
                          "#7C4DFF",
                      }}
                    >
                      👑
                      Admin
                    </Text>
                  )
                }
              </View>
            </View>

            {
              user.uid ===
                creatorId &&
                item.uid !==
                  creatorId && (
                  <TouchableOpacity
                    onPress={() =>
                      removeMember(
                        item.uid
                      )
                    }
                  >
                    <Ionicons
                      name="trash"
                      size={22}
                      color="red"
                    />
                  </TouchableOpacity>
                )
            }
          </View>
        )}
      />
    </SafeAreaView>
  );
}