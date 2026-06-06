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
        "Are you sure you want to remove this member from the trip?",
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
  style={styles.container}
>
     <View style={styles.header}>

<TouchableOpacity
style={styles.backButton}
onPress={()=>
navigation.goBack()
}
>

<Ionicons
name="chevron-back"
size={24}
color="#111"
/>

</TouchableOpacity>

<View
style={
styles.headerText
}
>

<Text
style={
styles.title
}
>
Members
</Text>

<Text
style={
styles.subtitle
}
>
Group participants
</Text>

</View>

</View>

    <Text style={styles.memberCount}>
{members.length}
 {members.length === 1
 ? " Member"
 : " Members"}
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

        ListEmptyComponent={
<View
style={styles.emptyContainer}
>

<Ionicons
name="people-outline"
size={70}
color="#BBB"
/>

<Text
style={styles.emptyTitle}
>
No Members
</Text>

<Text
style={styles.emptySubtitle}
>
Invite friends to
join this trip.
</Text>

</View>
}
        renderItem={({
          item,
        }) => (
         <View
style={
styles.memberCard
}
>

<View
style={
styles.leftSection
}
>

<Image
source={{
uri:
item.photoURL ||
"https://ui-avatars.com/api/?name="+
item.username
}}
style={
styles.avatar
}
/>

<View
style={
styles.info
}
>

<Text
style={
styles.username
}
>
{
item.uid ===
user.uid
?
`${item.username} (You)`
:
item.username
}
</Text>

{
item.uid ===
creatorId && (

<Text
style={
styles.adminText
}
>
Group Admin
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
style={
styles.removeButton
}
onPress={()=>
removeMember(
item.uid
)
}
>

<Ionicons
name="trash"
size={20}
color="#FF4D4F"
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