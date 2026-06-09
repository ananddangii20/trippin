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
  Modal,
  Image,
} from "react-native";

import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import styles from "../styles/AddMembersStyles";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function AddMembersScreen({
  route,
  navigation,
}) {
  const { tripId } = route.params;
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [tripData, setTripData] =
    useState(null);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        setUsers(
          snapshot.docs.map((userDoc) => ({
            id: userDoc.id,
            uid: userDoc.data().uid || userDoc.id,
            ...userDoc.data(),
          }))
        );
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "trips", tripId),
      (snapshot) => {
        if (!snapshot.exists()) return;

        const trip = snapshot.data();

        setTripData(trip);
        setMembers(trip.members || []);
      }
    );

    return unsubscribe;
  }, [tripId]);

  const getMemberUid = (member) => {
    if (typeof member === "string") {
      return member;
    }

    return member?.uid;
  };

  const isMemberAdded = (uid) => {
    return members.some((member) => {
      const memberUid =
        getMemberUid(member);

      if (memberUid !== uid) return false;

      if (typeof member === "string") {
        return true;
      }

      return (
        member.status !== "left" &&
        member.status !== "removed"
      );
    });
  };

  const sendInvite = async (selectedUserData) => {
    try {
      const receiverUid =
        selectedUserData.uid ||
        selectedUserData.id;

      if (!receiverUid) {
        Alert.alert(
          "Error",
          "User ID not found."
        );
        return;
      }

      if (receiverUid === user.uid) {
        Alert.alert(
          "Invalid",
          "You cannot invite yourself."
        );
        return;
      }

      if (isMemberAdded(receiverUid)) {
        Alert.alert(
          "Already Added",
          "This user is already a trip member."
        );
        return;
      }

      const tripRef = doc(
        db,
        "trips",
        tripId
      );

      const tripSnap =
        await getDoc(tripRef);

      if (!tripSnap.exists()) {
        Alert.alert(
          "Error",
          "Trip not found."
        );
        return;
      }

      const latestTrip =
        tripSnap.data();

      if (
        latestTrip.financeLocked ||
        latestTrip.paymentWindowOpen
      ) {
        Alert.alert(
          "Finance Locked",
          "Members cannot be invited after payment window opens."
        );
        return;
      }

      const inviteCheckQuery = query(
        collection(db, "notifications"),
        where("receiverUid", "==", receiverUid),
        where("tripId", "==", tripId),
        where("type", "==", "trip_invite"),
        where("status", "==", "pending")
      );

      const existingInvite =
        await getDocs(inviteCheckQuery);

      if (!existingInvite.empty) {
        Alert.alert(
          "Invite Already Sent",
          "This user already has a pending invite."
        );
        return;
      }

      const tripName =
        latestTrip.destination ||
        latestTrip.title ||
        "Trip";

      await addDoc(
        collection(db, "notifications"),
        {
          receiverUid,
          senderUid: user.uid,
          senderName:
            user.displayName || "Someone",

          tripId,
          tripName,

          type: "trip_invite",
          status: "pending",
          read: false,

          title: "Trip Invite",
          message: `${
            user.displayName || "Someone"
          } invited you to join ${tripName}.`,

          createdAt: serverTimestamp(),
        }
      );

      setSelectedUser(
        selectedUserData.username ||
          "User"
      );

      setModalVisible(true);
    } catch (e) {
      Alert.alert(
        "Error",
        e.message
      );
    }
  };

  const filtered = users.filter((userItem) =>
    userItem.username
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="#111"
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>
            Add Members
          </Text>

          <Text style={styles.subtitle}>
            Send trip invite request
          </Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
        />

        <TextInput
          placeholder="Search username"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) =>
          item.uid || item.id
        }
        renderItem={({ item }) => {
          const added =
            isMemberAdded(
              item.uid || item.id
            );

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                !added &&
                sendInvite(item)
              }
            >
              <View style={styles.left}>
                {item.photoURL ? (
                  <Image
                    source={{
                      uri: item.photoURL,
                    }}
                    style={styles.avatar}
                  />
                ) : (
                  <View
                    style={[
                      styles.avatar,
                      {
                        backgroundColor:
                          "#E5E7EB",
                        justifyContent:
                          "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Ionicons
                      name="person"
                      size={24}
                      color="#64748B"
                    />
                  </View>
                )}

                <View style={styles.info}>
                  <Text
                    style={styles.username}
                  >
                    {item.username}
                  </Text>

                  <Text style={styles.bio}>
                    Trip Member
                  </Text>
                </View>
              </View>

              {added ? (
                <View
                  style={styles.addedButton}
                >
                  <Text
                    style={styles.addedText}
                  >
                    Added ✓
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() =>
                    sendInvite(item)
                  }
                >
                  <Text
                    style={styles.addText}
                  >
                    Invite
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        }}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Ionicons
              name="paper-plane"
              size={75}
              color="#7C4DFF"
            />

            <Text style={styles.modalTitle}>
              Invite Sent
            </Text>

            <Text
              style={styles.modalSubtitle}
            >
              {selectedUser} will join only
              after accepting.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text
                style={
                  styles.modalButtonText
                }
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}