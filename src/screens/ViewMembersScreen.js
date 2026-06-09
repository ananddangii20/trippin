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
import styles from "../styles/ViewMembersStyles";
import { Ionicons } from "@expo/vector-icons";

import { db } from "../services/firebase";

import {
  doc,
  onSnapshot,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";

export default function ViewMembersScreen({
  route,
  navigation,
}) {
  const { tripId } = route.params;

  const { user } = useAuth();

  const [members, setMembers] =
    useState([]);

  const [creatorId, setCreatorId] =
    useState("");

  const [payments, setPayments] =
    useState({});

  const [budget, setBudget] =
    useState(0);

  const [financeLocked, setFinanceLocked] =
    useState(false);

  const [paymentWindowOpen, setPaymentWindowOpen] =
    useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "trips", tripId),
      async (snapshot) => {
        if (!snapshot.exists()) return;

        const trip = snapshot.data();

        setCreatorId(trip.userId);
        setPayments(trip.payments || {});
        setBudget(trip.budget || 0);
        setFinanceLocked(
          trip.financeLocked || false
        );
        setPaymentWindowOpen(
          trip.paymentWindowOpen || false
        );

        const tripMembers =
          trip.members || [];

        const usersSnapshot =
          await getDocs(
            collection(db, "users")
          );

        const usersList =
          usersSnapshot.docs.map(
            (userDoc) => ({
              id: userDoc.id,
              ...userDoc.data(),
            })
          );

        const finalMembers =
          tripMembers
            .map((tripMember) => {
              const memberUid =
                typeof tripMember === "string"
                  ? tripMember
                  : tripMember.uid;

              const memberStatus =
                typeof tripMember === "string"
                  ? "active"
                  : tripMember.status || "active";

              const userData =
                usersList.find(
                  (item) =>
                    item.uid === memberUid
                );

              if (!userData) return null;

              return {
                ...userData,
                status: memberStatus,
              };
            })
            .filter(Boolean);

        setMembers(finalMembers);
      }
    );

    return unsubscribe;
  }, [tripId]);

  const activeMembers =
    members.filter(
      (member) =>
        member.status !== "left" &&
        member.status !== "removed"
    );

  const activeMemberCount =
    activeMembers.length || 1;

  const perPerson =
    Math.ceil(budget / activeMemberCount);

  const totalPaid =
    Object.values(payments).reduce(
      (sum, payment) =>
        sum + (payment.amount || 0),
      0
    );

  const totalRequired =
    perPerson * activeMemberCount;

  const totalPending =
    Math.max(totalRequired - totalPaid, 0);

  const removeMember = (uid) => {
    if (
      financeLocked ||
      paymentWindowOpen
    ) {
      Alert.alert(
        "Finance Locked",
        "Members cannot be removed after payment window opens."
      );
      return;
    }

    Alert.alert(
      "Remove Member",
      "Are you sure you want to remove this member from the trip?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            const updatedMembers =
              members.map((member) => {
                if (member.uid === uid) {
                  return {
                    uid: member.uid,
                    status: "removed",
                    removedAt:
                      new Date().toISOString(),
                  };
                }

                return {
                  uid: member.uid,
                  status:
                    member.status || "active",
                };
              });

            await updateDoc(
              doc(db, "trips", tripId),
              {
                members: updatedMembers,
              }
            );
          },
        },
      ]
    );
  };

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

        <View style={styles.headerText}>
          <Text style={styles.title}>
            Members
          </Text>

          <Text style={styles.subtitle}>
            Group participants
          </Text>
        </View>

        {user?.uid === creatorId && (
          <TouchableOpacity
            disabled={
              financeLocked ||
              paymentWindowOpen
            }
            onPress={() =>
              navigation.navigate(
                "AddMembers",
                {
                  tripId,
                }
              )
            }
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor:
                financeLocked ||
                paymentWindowOpen
                  ? "#CBD5E1"
                  : "#2563EB",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="person-add"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.memberCount}>
        {activeMembers.length}
        {activeMembers.length === 1
          ? " Active Member"
          : " Active Members"}
      </Text>

      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 16,
          padding: 16,
          borderRadius: 18,
          backgroundColor: "#EFF6FF",
        }}
      >
        <Text
          style={{
            fontWeight: "800",
            fontSize: 16,
            color: "#111827",
            marginBottom: 10,
          }}
        >
          Payment Summary
        </Text>

        <Text
          style={{
            color: "#475569",
            fontWeight: "600",
            marginBottom: 4,
          }}
        >
          Per Person: ₹{perPerson}
        </Text>

        <Text
          style={{
            color: "#16A34A",
            fontWeight: "700",
            marginBottom: 4,
          }}
        >
          Total Paid: ₹{totalPaid}
        </Text>

        <Text
          style={{
            color: "#DC2626",
            fontWeight: "700",
          }}
        >
          Total Pending: ₹{totalPending}
        </Text>
      </View>

      <FlatList
        data={members}
        keyExtractor={(item) => item.uid}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="people-outline"
              size={70}
              color="#BBB"
            />

            <Text style={styles.emptyTitle}>
              No Members
            </Text>

            <Text style={styles.emptySubtitle}>
              Invite friends to join this trip.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const payment =
            payments?.[item.uid] || {};

          const paidAmount =
            payment.amount || 0;

          const pendingAmount =
            Math.max(
              perPerson - paidAmount,
              0
            );

          const creditAmount =
            Math.max(
              paidAmount - perPerson,
              0
            );

          const paymentStatus =
            pendingAmount === 0
              ? "Paid"
              : "Pending";

          return (
            <View style={styles.memberCard}>
              <View style={styles.leftSection}>
                <Image
                  source={{
                    uri:
                      item.photoURL ||
                      "https://ui-avatars.com/api/?name=" +
                        item.username,
                  }}
                  style={styles.avatar}
                />

                <View style={styles.info}>
                  <Text style={styles.username}>
                    {item.uid === user.uid
                      ? `${item.username} (You)`
                      : item.username}
                  </Text>

                  {item.uid === creatorId && (
                    <Text style={styles.adminText}>
                      Group Admin
                    </Text>
                  )}

                  <Text
                    style={{
                      marginTop: 5,
                      color: "#16A34A",
                      fontWeight: "700",
                      fontSize: 13,
                    }}
                  >
                    Paid ₹{paidAmount}
                  </Text>

                  {creditAmount > 0 ? (
                    <Text
                      style={{
                        marginTop: 3,
                        color: "#2563EB",
                        fontWeight: "700",
                        fontSize: 13,
                      }}
                    >
                      Credit ₹{creditAmount}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        marginTop: 3,
                        color: "#DC2626",
                        fontWeight: "700",
                        fontSize: 13,
                      }}
                    >
                      Pending ₹{pendingAmount}
                    </Text>
                  )}

                  <Text
                    style={{
                      marginTop: 3,
                      color:
                        item.status === "active"
                          ? "#64748B"
                          : "#EF4444",
                      fontWeight: "700",
                      fontSize: 12,
                      textTransform: "capitalize",
                    }}
                  >
                    Member Status: {item.status}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{
                    color:
                      paymentStatus === "Paid"
                        ? "#22C55E"
                        : "#EF4444",
                    fontWeight: "700",
                    fontSize: 14,
                  }}
                >
                  Status: {paymentStatus}
                </Text>

                {user.uid === creatorId &&
                  item.uid !== creatorId &&
                  item.status === "active" && (
                    <TouchableOpacity
                      disabled={
                        financeLocked ||
                        paymentWindowOpen
                      }
                      style={{
                        marginTop: 10,
                        opacity:
                          financeLocked ||
                          paymentWindowOpen
                            ? 0.4
                            : 1,
                      }}
                      onPress={() =>
                        removeMember(item.uid)
                      }
                    >
                      <Ionicons
                        name="trash"
                        size={20}
                        color="#FF4D4F"
                      />
                    </TouchableOpacity>
                  )}
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}