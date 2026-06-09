import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../services/firebase";

export default function NotificationsScreen({
  navigation,
}) {
  const [notifications, setNotifications] =
    useState([]);

  const [systemNotifications, setSystemNotifications] =
    useState([]);

  const [inviteNotifications, setInviteNotifications] =
    useState([]);

  useEffect(() => {
    const userId =
      auth.currentUser?.uid;

    if (!userId) return;

    const inviteQuery = query(
      collection(db, "notifications"),
      where("receiverUid", "==", userId)
    );

    const unsubscribe = onSnapshot(
      inviteQuery,
      (snapshot) => {
        const invites =
          snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            firestoreId: docSnap.id,
            ...docSnap.data(),
            icon:
              docSnap.data().type ===
              "trip_invite"
                ? "person-add-outline"
                : "notifications-outline",
            color:
              docSnap.data().status ===
              "pending"
                ? "#2563EB"
                : "#64748B",
          }));

        setInviteNotifications(invites);
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "trips"),
      (snapshot) => {
        const userId =
          auth.currentUser?.uid;

        if (!userId) return;

        const today = new Date();
        let generated = [];

        snapshot.docs.forEach((tripDoc) => {
          const trip = {
            id: tripDoc.id,
            ...tripDoc.data(),
          };

          const members =
            trip.members || [];

          const isMyTrip =
            members.some((member) => {
              if (
                typeof member ===
                "string"
              ) {
                return member === userId;
              }

              return (
                member.uid === userId &&
                member.status !== "left" &&
                member.status !== "removed"
              );
            }) || trip.userId === userId;

          if (!isMyTrip) return;

          const tripName =
            trip.destination ||
            trip.title ||
            "Your trip";

          const startDate =
            trip.startDate
              ? new Date(trip.startDate)
              : null;

          const endDate =
            trip.endDate
              ? new Date(trip.endDate)
              : null;

          const payment =
            trip.payments?.[userId];

          const paidAmount =
            payment?.amount || 0;

          const activeMembers =
            members.filter((member) => {
              if (
                typeof member ===
                "string"
              ) {
                return true;
              }

              return (
                member.status !== "left" &&
                member.status !== "removed"
              );
            });

          const activeCount =
            activeMembers.length || 1;

          const perPerson =
            Math.ceil(
              (trip.budget || 0) /
                activeCount
            );

          const remainingAmount =
            perPerson - paidAmount;

          if (startDate) {
            const diffTime =
              startDate.getTime() -
              today.getTime();

            const daysLeft =
              Math.ceil(
                diffTime /
                  (1000 *
                    60 *
                    60 *
                    24)
              );

            if (
              daysLeft > 0 &&
              daysLeft <= 7
            ) {
              generated.push({
                id:
                  trip.id +
                  "-trip-reminder",
                type: "trip_reminder",
                icon: "calendar-outline",
                color: "#2563EB",
                title: `${tripName} starts in ${daysLeft} day${
                  daysLeft === 1
                    ? ""
                    : "s"
                }`,
                message:
                  "Check your plan and stay ready for the trip.",
                tripId: trip.id,
                createdAt: startDate,
              });
            }

            if (daysLeft === 2) {
              generated.push({
                id:
                  trip.id +
                  "-payment-window",
                type: "payment_window",
                icon: "wallet-outline",
                color: "#F59E0B",
                title:
                  "Payment window is open",
                message: `You can now pay for ${tripName}.`,
                tripId: trip.id,
                createdAt: today,
              });

              if (remainingAmount > 0) {
                generated.push({
                  id:
                    trip.id +
                    "-pay-now",
                  type: "pay_now",
                  icon: "card-outline",
                  color: "#DC2626",
                  title: `Pay ₹${remainingAmount}`,
                  message: `Your payment is pending for ${tripName}.`,
                  tripId: trip.id,
                  createdAt: today,
                });
              }
            }
          }

          if (
            trip.paymentWindowOpen &&
            remainingAmount > 0
          ) {
            generated.push({
              id:
                trip.id +
                "-pending-payment",
              type: "pending_payment",
              icon: "alert-circle-outline",
              color: "#DC2626",
              title:
                "Payment pending",
              message: `₹${remainingAmount} is pending for ${tripName}.`,
              tripId: trip.id,
              createdAt: today,
            });
          }

          if (
            payment?.status === "paid" &&
            paidAmount >= perPerson
          ) {
            generated.push({
              id:
                trip.id +
                "-payment-success",
              type: "payment_success",
              icon: "checkmark-circle-outline",
              color: "#16A34A",
              title:
                "Payment completed",
              message: `You have successfully paid ₹${paidAmount} for ${tripName}.`,
              tripId: trip.id,
              createdAt:
                payment.paidAt
                  ? new Date(payment.paidAt)
                  : today,
            });
          }

          if (
            endDate &&
            endDate < today
          ) {
            generated.push({
              id:
                trip.id +
                "-completed",
              type: "trip_completed",
              icon: "flag-outline",
              color: "#7C3AED",
              title:
                "Trip completed",
              message: `${tripName} has been completed.`,
              tripId: trip.id,
              createdAt: endDate,
            });
          }
        });

        setSystemNotifications(generated);
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const combined = [
      ...inviteNotifications,
      ...systemNotifications,
    ];

    combined.sort((a, b) => {
      const aDate =
        a.createdAt?.toDate?.() ||
        new Date(a.createdAt || 0);

      const bDate =
        b.createdAt?.toDate?.() ||
        new Date(b.createdAt || 0);

      return bDate - aDate;
    });

    setNotifications(combined);
  }, [
    inviteNotifications,
    systemNotifications,
  ]);

  const acceptInvite = async (item) => {
    try {
      const userId =
        auth.currentUser?.uid;

      if (!userId) return;

      const tripRef = doc(
        db,
        "trips",
        item.tripId
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

      const trip =
        tripSnap.data();

      if (
        trip.financeLocked ||
        trip.paymentWindowOpen
      ) {
        await updateDoc(
          doc(
            db,
            "notifications",
            item.firestoreId
          ),
          {
            status: "expired",
            read: true,
          }
        );

        Alert.alert(
          "Invite Expired",
          "Payment window has opened. You cannot join now."
        );
        return;
      }

      const currentMembers =
        trip.members || [];

      const alreadyMember =
        currentMembers.some((member) => {
          if (
            typeof member === "string"
          ) {
            return member === userId;
          }

          return member.uid === userId;
        });

      let updatedMembers =
        currentMembers;

      if (alreadyMember) {
        updatedMembers =
          currentMembers.map((member) => {
            if (
              typeof member ===
              "string"
            ) {
              if (member === userId) {
                return {
                  uid: userId,
                  status: "active",
                  joinedAt:
                    new Date().toISOString(),
                };
              }

              return member;
            }

            if (member.uid === userId) {
              return {
                ...member,
                status: "active",
                acceptedAt:
                  new Date().toISOString(),
              };
            }

            return member;
          });
      } else {
        updatedMembers = [
          ...currentMembers,
          {
            uid: userId,
            status: "active",
            joinedAt:
              new Date().toISOString(),
          },
        ];
      }

      await updateDoc(tripRef, {
        members: updatedMembers,
      });

      await updateDoc(
        doc(
          db,
          "notifications",
          item.firestoreId
        ),
        {
          status: "accepted",
          read: true,
          acceptedAt:
            new Date().toISOString(),
        }
      );

      Alert.alert(
        "Joined",
        "You joined the trip successfully."
      );
    } catch (e) {
      Alert.alert(
        "Error",
        e.message
      );
    }
  };

  const declineInvite = async (item) => {
    try {
      await updateDoc(
        doc(
          db,
          "notifications",
          item.firestoreId
        ),
        {
          status: "declined",
          read: true,
          declinedAt:
            new Date().toISOString(),
        }
      );
    } catch (e) {
      Alert.alert(
        "Error",
        e.message
      );
    }
  };

  const renderNotification = ({ item }) => {
    const isInvite =
      item.type === "trip_invite";

    const isPending =
      item.status === "pending";

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (
            item.tripId &&
            !isInvite
          ) {
            navigation.navigate(
              "TripDetails",
              {
                tripId: item.tripId,
              }
            );
          }
        }}
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#F1F5F9",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor:
              item.color + "15",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 14,
          }}
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={item.color}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "800",
              color: "#111827",
              marginBottom: 4,
            }}
          >
            {item.title}
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: "#64748B",
              lineHeight: 20,
            }}
          >
            {item.message}
          </Text>

          {isInvite && isPending && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  acceptInvite(item)
                }
                style={{
                  backgroundColor:
                    "#2563EB",
                  paddingHorizontal: 18,
                  paddingVertical: 9,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  Accept
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  declineInvite(item)
                }
                style={{
                  backgroundColor:
                    "#E5E7EB",
                  paddingHorizontal: 18,
                  paddingVertical: 9,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: "#111827",
                    fontWeight: "700",
                  }}
                >
                  Decline
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {isInvite && !isPending && (
            <Text
              style={{
                marginTop: 8,
                color:
                  item.status === "accepted"
                    ? "#16A34A"
                    : "#DC2626",
                fontWeight: "700",
                textTransform:
                  "capitalize",
              }}
            >
              {item.status}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderBottomColor: "#F1F5F9",
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
            color="#111"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            marginLeft: 12,
          }}
        >
          Notifications
        </Text>
      </View>

      <FlatList
        data={notifications}
     keyExtractor={(item, index) =>
  `${item.id}-${item.type}-${index}`
}
        renderItem={renderNotification}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: 120,
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={70}
              color="#CBD5E1"
            />

            <Text
              style={{
                marginTop: 15,
                fontSize: 18,
                fontWeight: "600",
                color: "#475569",
              }}
            >
              No notifications yet
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}