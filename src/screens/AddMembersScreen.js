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
} from "react-native";

import {
  collection,
  onSnapshot,
  doc,
   getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import styles from "../styles/AddMembersStyles";

import { Ionicons } from "@expo/vector-icons";

import { Image } from "react-native";

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

    const [members, setMembers] =
  useState([]);

const [modalVisible,
setModalVisible] =
  useState(false);

const [selectedUser,
setSelectedUser] =
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


  useEffect(() => {
  const unsubscribe =
    onSnapshot(
      doc(
        db,
        "trips",
        tripId
      ),
      (snapshot) => {
        if (
          snapshot.exists()
        ) {
          setMembers(
            snapshot.data()
              .members || []
          );
        }
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

      setSelectedUser(
  user.username
);

setModalVisible(
  true
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
      Invite friends to this trip
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
keyExtractor={(item)=>item.id}
renderItem={({item})=>(

<TouchableOpacity
style={styles.card}
onPress={()=>
addMember(item)
}
>

<View style={styles.left}>

<Image
source={{
uri:
item.photoURL ||
"https://ui-avatars.com/api/?name="+
item.username
}}
style={styles.avatar}
/>

<View style={styles.info}>
<Text style={styles.username}>
{item.username}
</Text>

<Text style={styles.bio}>
Trip Member
</Text>
</View>

</View>

{
members.includes(
item.uid
)

?

<View
style={
styles.addedButton
}
>
<Text
style={
styles.addedText
}
>
Added ✓
</Text>
</View>

:

<TouchableOpacity
style={
styles.addButton
}
onPress={()=>
addMember(
item
)
}
>

<Text
style={
styles.addText
}
>
Add
</Text>

</TouchableOpacity>

}

</TouchableOpacity>

)}
/>

<Modal
visible={
modalVisible
}
transparent
animationType="fade"
>

<View
style={
styles.modalOverlay
}
>

<View
style={
styles.modalCard
}
>

<Ionicons
name="checkmark-circle"
size={75}
color="#7C4DFF"
/>

<Text
style={
styles.modalTitle
}
>
Added Successfully
</Text>

<Text
style={
styles.modalSubtitle
}
>
{selectedUser}
 joined the trip.
</Text>

<TouchableOpacity
style={
styles.modalButton
}
onPress={()=>
setModalVisible(
false
)
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