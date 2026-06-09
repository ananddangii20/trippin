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

  const [members, setMembers] = useState([]);
  const [creatorId, setCreatorId] = useState("");
  const [payments, setPayments] = useState({});
  const [budget, setBudget] = useState(0);
  const [financeLocked, setFinanceLocked] = useState(false);
  const [paymentWindowOpen, setPaymentWindowOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "trips", tripId),
      async (snapshot) => {
        if (!snapshot.exists()) return;

        const trip = snapshot.data();

        setCreatorId(trip.userId);
        setPayments(trip.payments || {});
        setBudget(trip.budget || 0);
        setFinanceLocked(trip.financeLocked || false);
        setPaymentWindowOpen(trip.paymentWindowOpen || false);

        const tripMembers = trip.members || [];

        const usersSnapshot = await getDocs(
          collection(db, "users")
        );

        const usersList = usersSnapshot.docs.map((userDoc) => ({
          id: userDoc.id,
          uid: userDoc.data().uid || userDoc.id,
          ...userDoc.data(),
        }));

        const finalMembers = tripMembers
          .map((tripMember) => {
            const memberUid =
              typeof tripMember === "string"
                ? tripMember
                : tripMember.uid;

            const memberStatus =
              typeof tripMember === "string"
                ? "active"
                : tripMember.status || "active";

            const userData = usersList.find(
              (item) => item.uid === memberUid
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

  const activeMembers = members.filter(
    (member) =>
      member.status !== "left" &&
      member.status !== "removed"
  );

  const activeMemberCount = activeMembers.length || 1;

  const perPerson = Math.ceil(budget / activeMemberCount);

  const totalPaid = Object.values(payments).reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );

  const totalRequired = perPerson * activeMemberCount;

  const totalPending = Math.max(totalRequired - totalPaid, 0);

  const removeMember = (uid) => {
    if (financeLocked || paymentWindowOpen) {
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
            const updatedMembers = members.map((member) => {
              if (member.uid === uid) {
                return {
                  uid: member.uid,
                  status: "removed",
                  removedAt: new Date().toISOString(),
                };
              }

              return {
                uid: member.uid,
                status: member.status || "active",
              };
            });

            await updateDoc(doc(db, "trips", tripId), {
              members: updatedMembers,
            });
          },
        },
      ]
    );
  };

  const renderAvatar = (item) => {
    if (item.photoURL) {
      return (
        <Image
          source={{ uri: item.photoURL }}
          style={styles.avatar}
        />
      );
    }

    return (
      <View
        style={[
          styles.avatar,
          {
            backgroundColor: "#E5E7EB",
            justifyContent: "center",
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
    );
  };

  const renderSummaryBox = (
    label,
    value,
    icon,
    color,
    bg
  ) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: bg,
          borderRadius: 16,
          paddingVertical: 14,
          paddingHorizontal: 10,
          marginHorizontal: 4,
          alignItems: "center",
        }}
      >
        <Ionicons
          name={icon}
          size={20}
          color={color}
        />

        <Text
          style={{
            marginTop: 8,
            fontSize: 17,
            fontWeight: "900",
            color,
          }}
        >
          {value}
        </Text>

        <Text
          style={{
            marginTop: 3,
            fontSize: 11,
            fontWeight: "700",
            color: "#64748B",
            textAlign: "center",
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="#111"
          />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>Members</Text>

          <Text style={styles.subtitle}>
            Payments & participants
          </Text>
        </View>

        {user?.uid === creatorId && (
          <TouchableOpacity
            disabled={financeLocked || paymentWindowOpen}
            onPress={() =>
              navigation.navigate("AddMembers", {
                tripId,
              })
            }
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor:
                financeLocked || paymentWindowOpen
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

      <View
        style={{
          marginHorizontal: 20,
          marginTop: 8,
          marginBottom: 18,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "800",
            color: "#475569",
            marginBottom: 12,
          }}
        >
          {activeMembers.length} Active Members
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: -4,
          }}
        >
          {renderSummaryBox(
            "Per Person",
            `₹${perPerson}`,
            "person-outline",
            "#2563EB",
            "#EFF6FF"
          )}

          {renderSummaryBox(
            "Paid",
            `₹${totalPaid}`,
            "checkmark-circle-outline",
            "#16A34A",
            "#ECFDF5"
          )}

          {renderSummaryBox(
            "Pending",
            `₹${totalPending}`,
            "time-outline",
            "#DC2626",
            "#FEF2F2"
          )}
        </View>
      </View>

      <FlatList
        data={members}
        keyExtractor={(item, index) =>
          `${item.uid}-${index}`
        }
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 30,
        }}
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
          const payment = payments?.[item.uid] || {};

          const paidAmount = payment.amount || 0;

          const pendingAmount = Math.max(
            perPerson - paidAmount,
            0
          );

          const creditAmount = Math.max(
            paidAmount - perPerson,
            0
          );

          const isPaid = pendingAmount === 0;

          return (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                padding: 16,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: "#E5E7EB",
                shadowColor: "#000",
                shadowOpacity: 0.04,
                shadowRadius: 8,
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {renderAvatar(item)}

                <View
                  style={{
                    flex: 1,
                    marginLeft: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "900",
                      color: "#111827",
                    }}
                  >
                    {item.uid === user.uid
                      ? `${item.username} (You)`
                      : item.username}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    {item.uid === creatorId && (
                      <View
                        style={{
                          backgroundColor: "#EEF2FF",
                          paddingHorizontal: 9,
                          paddingVertical: 4,
                          borderRadius: 20,
                          marginRight: 6,
                        }}
                      >
                        <Text
                          style={{
                            color: "#4F46E5",
                            fontWeight: "800",
                            fontSize: 11,
                          }}
                        >
                          Admin
                        </Text>
                      </View>
                    )}

                    <View
                      style={{
                        backgroundColor:
                          item.status === "active"
                            ? "#F1F5F9"
                            : "#FEF2F2",
                        paddingHorizontal: 9,
                        paddingVertical: 4,
                        borderRadius: 20,
                      }}
                    >
                      <Text
                        style={{
                          color:
                            item.status === "active"
                              ? "#475569"
                              : "#DC2626",
                          fontWeight: "800",
                          fontSize: 11,
                          textTransform: "capitalize",
                        }}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: isPaid
                      ? "#ECFDF5"
                      : "#FEF2F2",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: isPaid ? "#16A34A" : "#DC2626",
                      fontWeight: "900",
                      fontSize: 12,
                    }}
                  >
                    {isPaid ? "Paid" : "Pending"}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 16,
                  backgroundColor: "#F8FAFC",
                  borderRadius: 16,
                  padding: 12,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#64748B",
                      fontWeight: "700",
                      fontSize: 12,
                    }}
                  >
                    Paid
                  </Text>

                  <Text
                    style={{
                      marginTop: 4,
                      color: "#16A34A",
                      fontWeight: "900",
                      fontSize: 15,
                    }}
                  >
                    ₹{paidAmount}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#64748B",
                      fontWeight: "700",
                      fontSize: 12,
                    }}
                  >
                    {creditAmount > 0
                      ? "Credit"
                      : "Pending"}
                  </Text>

                  <Text
                    style={{
                      marginTop: 4,
                      color:
                        creditAmount > 0
                          ? "#2563EB"
                          : "#DC2626",
                      fontWeight: "900",
                      fontSize: 15,
                    }}
                  >
                    ₹
                    {creditAmount > 0
                      ? creditAmount
                      : pendingAmount}
                  </Text>
                </View>

                {user.uid === creatorId &&
                  item.uid !== creatorId &&
                  item.status === "active" && (
                    <TouchableOpacity
                      disabled={
                        financeLocked ||
                        paymentWindowOpen
                      }
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: "#FEF2F2",
                        justifyContent: "center",
                        alignItems: "center",
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
                        name="trash-outline"
                        size={19}
                        color="#DC2626"
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