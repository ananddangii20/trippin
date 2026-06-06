import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import { SafeAreaView } from "react-native-safe-area-context";

import { db } from "../services/firebase";

export default function AddMembersScreen({
  route,
  navigation,
}) {
  const { tripId } =
    route.params;

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    const unsubscribe =
      onSnapshot(
        collection(
          db,
          "users"
        ),
        (snapshot) => {
          setUsers(
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            )
          );
        }
      );

    return unsubscribe;
  }, []);

  const addMember =
    async (user) => {
      try {
        await updateDoc(
          doc(
            db,
            "trips",
            tripId
          ),
          {
            members:
              arrayUnion(
                user.uid
              ),
          }
        );

        Alert.alert(
          "Success",
          user.username +
            " added"
        );
      } catch (e) {
        Alert.alert(
          "Error",
          e.message
        );
      }
    };

  const filtered =
    users.filter(
      (user) =>
        user.username
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 15,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          marginBottom: 15,
        }}
      >
        Add Members
      </Text>

      <TextInput
        placeholder="Search username"
        value={search}
        onChangeText={
          setSearch
        }
        style={{
          borderWidth: 1,
          borderColor:
            "#ddd",
          borderRadius: 12,
          padding: 12,
          marginBottom: 15,
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(
          item
        ) => item.id}
        renderItem={({
          item,
        }) => (
          <TouchableOpacity
            style={{
              flexDirection:
                "row",
              justifyContent:
                "space-between",
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor:
                "#eee",
            }}
            onPress={() =>
              addMember(
                item
              )
            }
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {
                item.username
              }
            </Text>

            <Text
              style={{
                color:
                  "#7C4DFF",
                fontWeight:
                  "700",
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}