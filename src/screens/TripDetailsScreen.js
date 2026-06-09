import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/TripDetailsStyles";
import BottomNavbar from "../components/BottomNavbar";
import { useAuth } from "../context/AuthContext";

import {
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";

import { db } from "../services/firebase";

export default function TripDetailsScreen({
  route,
  navigation,
}) {
  const { user } = useAuth();

  const [tripData, setTripData] =
    React.useState(null);

  const [userProfiles, setUserProfiles] =
    React.useState({});

  const {
    tripId,
    creatorId,
    title = "Trip",
    date = "",
    image,
    budget = 0,
    members = [],
  } = route.params || {};

  React.useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "trips", tripId),
      async (snapshot) => {
        if (!snapshot.exists()) return;

        const data = snapshot.data();

        const now = new Date();
        const startDate = data.startDate
          ? new Date(data.startDate)
          : null;

        let shouldLockFinance = false;

        if (startDate) {
          const twoDaysBefore =
            new Date(startDate);

          twoDaysBefore.setDate(
            twoDaysBefore.getDate() - 2
          );

          shouldLockFinance =
            now >= twoDaysBefore;
        }

        if (
          shouldLockFinance &&
          (!data.financeLocked ||
            !data.paymentWindowOpen)
        ) {
          await updateDoc(
            doc(db, "trips", tripId),
            {
              financeLocked: true,
              paymentWindowOpen: true,
            }
          );
        }

        setTripData(data);
      }
    );

    return unsub;
  }, [tripId]);

  React.useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const profiles = {};

        snapshot.docs.forEach((userDoc) => {
          const data = userDoc.data();
          const uid = data.uid || userDoc.id;

          profiles[uid] = {
            uid,
            username:
              data.username || "User",
            photoURL:
              data.photoURL || "",
          };
        });

        setUserProfiles(profiles);
      }
    );

    return unsub;
  }, []);

  const liveBudget =
    tripData?.budget || budget;

  const liveMembers =
    tripData?.members || members;

  const payments =
    tripData?.payments || {};

  const liveCollected =
    Object.values(payments).reduce(
      (sum, payment) =>
        sum + (payment.amount || 0),
      0
    );

  const financeLocked =
    tripData?.financeLocked || false;

  const paymentWindowOpen =
    tripData?.paymentWindowOpen || false;

  const getMemberUid = (member) => {
    if (typeof member === "string") {
      return member;
    }

    return member?.uid;
  };

  const getMemberStatus = (member) => {
    if (typeof member === "string") {
      return "active";
    }

    return member?.status || "active";
  };

  const activeMembers =
    liveMembers.filter((member) => {
      const status =
        getMemberStatus(member);

      return (
        status !== "left" &&
        status !== "removed"
      );
    });

  const currentMember =
    liveMembers.find(
      (member) =>
        getMemberUid(member) === user?.uid
    );

  const isCurrentMemberActive =
    currentMember &&
    getMemberStatus(currentMember) ===
      "active";

  const totalMembers =
    activeMembers.length || 1;

  const perPerson =
    Math.ceil(liveBudget / totalMembers);

  const userPayment =
    payments[user?.uid] || null;

  const amountAlreadyPaid =
    userPayment?.amount || 0;

  const remainingAmount =
    perPerson - amountAlreadyPaid;

  const hasCredit =
    remainingAmount < 0;

  const canPay =
    financeLocked &&
    paymentWindowOpen &&
    remainingAmount > 0;

  const progress =
    liveBudget > 0
      ? Math.min(
          Math.round(
            (liveCollected / liveBudget) *
              100
          ),
          100
        )
      : 0;

  const visibleAvatars =
    activeMembers.slice(0, 3);

  const handlePayment = () => {
    if (!canPay) {
      Alert.alert(
        "Payments Closed",
        "Payments open 2 days before trip."
      );
      return;
    }

    Alert.alert(
      "Test Payment",
      `Pay ₹${remainingAmount}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Pay",
          onPress: async () => {
            try {
              const newTotalPaid =
                amountAlreadyPaid +
                remainingAmount;

              await updateDoc(
                doc(db, "trips", tripId),
                {
                  collected:
                    liveCollected +
                    remainingAmount,

                  [`payments.${user.uid}`]: {
                    amount: newTotalPaid,
                    status: "paid",
                    paidAt:
                      new Date().toISOString(),
                    paymentId: "",
                    paymentMethod: "test",
                  },
                }
              );

              Alert.alert(
                "Success",
                "Payment Recorded"
              );
            } catch (e) {
              Alert.alert(
                "Error",
                e.message
              );
            }
          },
        },
      ]
    );
  };

  const deleteTrip = () => {
    if (
      financeLocked ||
      paymentWindowOpen
    ) {
      Alert.alert(
        "Finance Locked",
        "Trip cannot be deleted after payment window opens."
      );
      return;
    }

    Alert.alert(
      "Delete Group",
      "Are you sure you want to delete this group?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(
                doc(db, "trips", tripId)
              );

              navigation.navigate("Trips");
            } catch (e) {
              Alert.alert(
                "Error",
                e.message
              );
            }
          },
        },
      ]
    );
  };

  const leaveGroup = () => {
    if (
      financeLocked ||
      paymentWindowOpen
    ) {
      Alert.alert(
        "Finance Locked",
        "You cannot leave the group after payment window opens."
      );
      return;
    }

    if (!isCurrentMemberActive) {
      Alert.alert(
        "Already Left",
        "You are no longer an active member of this group."
      );
      return;
    }

    Alert.alert(
      "Leave Group",
      "Are you sure you want to leave this group?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Leave",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedMembers =
                liveMembers.map((member) => {
                  const memberUid =
                    getMemberUid(member);

                  if (
                    memberUid === user.uid
                  ) {
                    return {
                      ...(typeof member ===
                      "object"
                        ? member
                        : {}),
                      uid: user.uid,
                      status: "left",
                      leftAt:
                        new Date().toISOString(),
                    };
                  }

                  return member;
                });

              await updateDoc(
                doc(db, "trips", tripId),
                {
                  members: updatedMembers,
                }
              );

              Alert.alert(
                "Success",
                "You left the group."
              );

              navigation.navigate("Trips");
            } catch (e) {
              Alert.alert(
                "Error",
                e.message
              );
            }
          },
        },
      ]
    );
  };

  const renderAvatar = (
    member,
    index
  ) => {
    const uid =
      getMemberUid(member);

    const profile =
      userProfiles[uid];

    const photoURL =
      profile?.photoURL;

    if (photoURL) {
      return (
        <Image
          key={uid}
          source={{
            uri: photoURL,
          }}
          style={[
            styles.avatar,
            index !== 0 && {
              marginLeft: -12,
            },
          ]}
        />
      );
    }

    return (
      <View
        key={uid}
        style={[
          styles.avatar,
          {
            marginLeft:
              index !== 0 ? -12 : 0,
            backgroundColor: "#E5E7EB",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: "#fff",
          },
        ]}
      >
        <Ionicons
          name="person"
          size={20}
          color="#64748B"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerSide}
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#2563EB"
          />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text
            numberOfLines={1}
            style={styles.title}
          >
            {title}
          </Text>

          <Text style={styles.date}>
            {date}
          </Text>
        </View>

        {isCurrentMemberActive ? (
          <TouchableOpacity
            style={styles.headerSide}
            onPress={leaveGroup}
          >
            <Ionicons
              name="exit-outline"
              size={24}
              color="#DC2626"
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerSide} />
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <ImageBackground
          source={
            image
              ? { uri: image }
              : require("../../assets/images/trip1.png")
          }
          style={styles.heroImage}
          imageStyle={
            styles.heroImageRadius
          }
        >
          <View
            style={styles.avatarContainer}
          >
            {visibleAvatars.map(
              (member, index) =>
                renderAvatar(
                  member,
                  index
                )
            )}

            {totalMembers > 3 && (
              <View style={styles.moreAvatar}>
                <Text style={styles.moreText}>
                  +{totalMembers - 3}
                </Text>
              </View>
            )}
          </View>
        </ImageBackground>

        <TouchableOpacity
          style={{
            marginHorizontal: 20,
            marginTop: 15,
            backgroundColor: "#2563EB",
            paddingVertical: 16,
            borderRadius: 18,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#2563EB",
            shadowOpacity: 0.2,
            shadowRadius: 10,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            elevation: 5,
          }}
          onPress={() =>
            navigation.navigate(
              "ViewMembers",
              {
                tripId,
              }
            )
          }
        >
          <Ionicons
            name="people"
            size={20}
            color="#fff"
          />

          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              marginLeft: 8,
              fontSize: 15,
            }}
          >
            View All Members
          </Text>
        </TouchableOpacity>
        {user?.uid === creatorId &&
  !financeLocked &&
  !paymentWindowOpen && (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          "CreateTrip",
          {
            tripId,
          }
        )
      }
      style={{
        marginHorizontal: 20,
        marginTop: 12,
        backgroundColor: "#EEF2FF",
        paddingVertical: 14,
        borderRadius: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons
        name="create-outline"
        size={20}
        color="#2563EB"
      />

      <Text
        style={{
          marginLeft: 8,
          color: "#2563EB",
          fontWeight: "800",
          fontSize: 15,
        }}
      >
        Edit Trip Details
      </Text>
    </TouchableOpacity>
  )}

        <View style={styles.budgetProgressCard}>
          <View
            style={{
              flexDirection: "row",
              justifyContent:
                "space-between",
              alignItems: "flex-start",
            }}
          >
            <View>
              <Text
                style={styles.cardLabel}
              >
                Trip Budget
              </Text>

              <Text
                style={styles.bigBudget}
              >
                ₹
                {liveBudget.toLocaleString()}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#EFF6FF",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="people"
                size={16}
                color="#2563EB"
              />

              <Text
                style={{
                  marginLeft: 6,
                  color: "#2563EB",
                  fontWeight: "700",
                }}
              >
                {totalMembers}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent:
                "space-between",
              marginTop: 15,
            }}
          >
            <Text
              style={styles.cardLabel}
            >
              Collected
            </Text>

            <Text
              style={styles.greenText}
            >
              ₹
              {liveCollected.toLocaleString()}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent:
                "space-between",
              marginTop: 12,
            }}
          >
            <Text
              style={styles.cardLabel}
            >
              Your Share
            </Text>

            <Text
              style={{
                fontWeight: "700",
                color: "#2563EB",
              }}
            >
              ₹{perPerson}
            </Text>
          </View>

          <View
            style={[
              styles.progressTrack,
              {
                marginTop: 18,
              },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>

          <Text
            style={{
              marginTop: 8,
              textAlign: "right",
              color: "#64748B",
            }}
          >
            {progress}% Collected
          </Text>

          <View
            style={{
              marginTop: 20,
            }}
          >
            {!paymentWindowOpen ? (
              <View
                style={{
                  backgroundColor:
                    "#E5E7EB",
                  paddingVertical: 16,
                  borderRadius: 14,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#475569",
                    fontWeight: "700",
                    fontSize: 15,
                  }}
                >
                  Payments open 2 days
                  before trip
                </Text>
              </View>
            ) : hasCredit ? (
              <View
                style={{
                  backgroundColor:
                    "#ECFDF5",
                  paddingVertical: 16,
                  borderRadius: 14,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#16A34A",
                    fontWeight: "700",
                    fontSize: 16,
                  }}
                >
                  Credit ₹
                  {Math.abs(
                    remainingAmount
                  )}
                </Text>
              </View>
            ) : remainingAmount === 0 ? (
              <View
                style={{
                  backgroundColor:
                    "#22C55E",
                  paddingVertical: 16,
                  borderRadius: 14,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: 16,
                  }}
                >
                  ✓ Payment Completed
                </Text>
              </View>
            ) : (
              <>
                {amountAlreadyPaid > 0 && (
                  <Text
                    style={{
                      marginBottom: 8,
                      color: "#DC2626",
                      fontWeight: "700",
                      textAlign:
                        "center",
                    }}
                  >
                    Additional Payment
                    Required ₹
                    {remainingAmount}
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.payButton}
                  onPress={
                    handlePayment
                  }
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: 16,
                    }}
                  >
                    Pay ₹
                    {remainingAmount}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() =>
              navigation.navigate("Chat", {
                tripId,
                tripName: title,
              })
            }
          >
            <Ionicons
              name="chatbubble"
              size={26}
              color="#2563EB"
            />
            <Text style={styles.actionText}>
              Chat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
          >
            <Ionicons
              name="wallet"
              size={26}
              color="#2563EB"
            />
            <Text style={styles.actionText}>
              Expenses
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
          >
            <Ionicons
              name="bed"
              size={26}
              color="#2563EB"
            />
            <Text style={styles.actionText}>
              Stay
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
          >
            <Ionicons
              name="map"
              size={26}
              color="#2563EB"
            />
            <Text style={styles.actionText}>
              Plan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() =>
              navigation.navigate(
                "Photos",
                {
                  tripId,
                }
              )
            }
          >
            <Ionicons
              name="camera"
              size={26}
              color="#2563EB"
            />
            <Text style={styles.actionText}>
              Media
            </Text>
          </TouchableOpacity>
        </View>

        {user?.uid === creatorId && (
          <TouchableOpacity
            onPress={deleteTrip}
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              marginBottom: 30,
              backgroundColor: "#DC2626",
              paddingVertical: 15,
              borderRadius: 14,
              flexDirection: "row",
              justifyContent:
                "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="trash"
              size={20}
              color="#fff"
            />

            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                marginLeft: 8,
                fontSize: 15,
              }}
            >
              Delete Group
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <BottomNavbar activeTab="Trips" />
    </SafeAreaView>
  );
}