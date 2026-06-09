import React, {
  useEffect,
  useState,
} from "react";

import * as ImagePicker from "expo-image-picker";

import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../services/firebase";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
 
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import {
  VideoView,
  useVideoPlayer,
} from "expo-video";

import styles from "../styles/PhotosStyles";

import {
  deleteDoc,
  doc,
} from
"firebase/firestore";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails
from "expo-video-thumbnails";

function VideoCard({
  item,
  index,
  videos,
  navigation,
}) {

  const player =
    useVideoPlayer(
      item.mediaUrl
    );

  return (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() =>
        navigation.navigate(
          "VideoGallery",
          {
            videos,
            index,
          }
        )
      }
    >
      <VideoView
        player={player}
        style={styles.videoThumb}
      />

      <View
        style={{
          position: "absolute",
          top: "45%",
          left: "45%",
        }}
      >
        <Ionicons
          name="play-circle"
          size={40}
          color="#fff"
        />
      </View>
    </TouchableOpacity>
  );
}

function VideoThumbnail({
  uri,
}) {

  const [thumbnail,
    setThumbnail] =
    useState(null);

  useEffect(() => {

    const load =
      async () => {
        try {

          const {
            uri: thumb,
          } =
            await VideoThumbnails.getThumbnailAsync(
              uri,
              {
                time: 1000,
              }
            );

          setThumbnail(
            thumb
          );

        } catch (e) {
          console.log(e);
        }
      };

    load();

  }, []);

  return (
    <Image
      source={{
        uri:
          thumbnail,
      }}
      style={
        styles.image
      }
    />
  );
}

export default function PhotosScreen({
  navigation,
  route,
}) {

  const { tripId } =
  route.params;

console.log(
  "Received TripId:",
  tripId
);

  const [activeTab, setActiveTab] =
    useState("Photos");

  const [photos, setPhotos] =
  useState([]);

  const [videos, setVideos] =
  useState([]);

  const media = [
  ...photos,
  ...videos,
].sort((a, b) => {
  const aTime =
    a.createdAt?.seconds || 0;

  const bTime =
    b.createdAt?.seconds || 0;

  return bTime - aTime;
});

  const [toast, setToast] =
  useState("");

  const [selectionMode,
setSelectionMode] =
useState(false);

const [selectedImages,
setSelectedImages] =
useState([]);

  useEffect(() => {

  const q = query(
    collection(
      db,
      "tripMedia"
    ),

    where(
      "tripId",
      "==",
      tripId
    )
  );

  const unsubscribe =
    onSnapshot(
      q,
      (snapshot) => {

       const data =
  snapshot.docs.map(
    (doc) => ({
      id:
        doc.id,
      ...doc.data(),
    })
  );

console.log(
  "Firestore Data:",
  data
);

        const imageData =
  data.filter(
    (item) =>
      item.type ===
      "image"
  );

console.log(
  "Image Data:",
  imageData
);

setPhotos(
  imageData
);

        setVideos(
          data.filter(
            (item) =>
              item.type ===
              "video"
          )
        );
      }
    );

  return unsubscribe;

}, []);

  const deleteImages =
async () => {

  for (
    const id of
    selectedImages
  ) {
    await deleteDoc(
      doc(
        db,
        "tripMedia",
        id
      )
    );
  }

  setSelectedImages(
    []
  );

  setSelectionMode(
    false
  );
};

const downloadImages =
async () => {

  const permission =
    await MediaLibrary.requestPermissionsAsync();

  if (!permission.granted) {
    setToast(
      "Storage permission denied"
    );
    return;
  }

  try {

    for (const id of selectedImages) {

      const image =
        photos.find(
          (item) =>
            item.id === id
        );

      if (!image) continue;

      const downloadResumable =
        FileSystem.createDownloadResumable(
          image.mediaUrl,
          FileSystem.cacheDirectory +
            `${id}.jpg`
        );

      const result =
        await downloadResumable.downloadAsync();

      if (result) {
        const asset =
          await MediaLibrary.createAssetAsync(
            result.uri
          );

        await MediaLibrary.createAlbumAsync(
          "Trippin",
          asset,
          false
        );
      }
    }

    setToast(
      "Images downloaded"
    );

    setSelectedImages([]);
    setSelectionMode(false);

    setTimeout(() => {
      setToast("");
    }, 2500);

  } catch (e) {

    console.log(
      "DOWNLOAD ERROR",
      e
    );

    setToast(
      "Download failed"
    );

    setTimeout(() => {
      setToast("");
    }, 2500);
  }
};

  const pickMedia = async () => {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    return;
  }

  const uploadToCloudinary =
  async (asset) => {

    const formData =
      new FormData();

    formData.append(
      "file",
      {
        uri: asset.uri,
        type:
          asset.mimeType ||
          "image/jpeg",
        name:
          asset.fileName ||
          "photo.jpg",
      }
    );

    formData.append(
      "upload_preset",
      "trip_planner"
    );

   const cloudinaryUrl =
  asset.type === "video"
    ? "https://api.cloudinary.com/v1_1/dbyrgfhu9/video/upload"
    : "https://api.cloudinary.com/v1_1/dbyrgfhu9/image/upload";

const response =
  await fetch(
    cloudinaryUrl,
    {
      method: "POST",
      body: formData,
    }
  );

    const data =
      await response.json();

    return data.secure_url;
};

 const result =
  await ImagePicker.launchImageLibraryAsync({
    mediaTypes:
      ImagePicker.MediaTypeOptions.All,
    allowsMultipleSelection: true,
    quality: 0.7,
  });

  if (result.canceled) return;

for (const asset of result.assets) {
  const imageUrl =
    await uploadToCloudinary(
      asset
    );

  await addDoc(
    collection(
      db,
      "tripMedia"
    ),
    {
      tripId,
      userId:
        auth.currentUser.uid,
     type:
  asset.type === "video"
    ? "video"
    : "image",
      mediaUrl:
        imageUrl,
      createdAt:
        serverTimestamp(),
    }
  );
}

setToast(
  `${result.assets.length} image${
    result.assets.length > 1
      ? "s"
      : ""
  } added successfully`
);

setTimeout(() => {
  setToast("");
}, 2500);
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="chevron-back"
            size={26}
            color="#222"
          />
        </TouchableOpacity>

       <View
  style={{
    flex: 1,
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  }}
>
  <Text
    style={styles.title}
  >
    Media
  </Text>

  <TouchableOpacity
    onPress={() => {
      setSelectionMode(
        !selectionMode
      );
      setSelectedImages(
        []
      );
    }}
  >
    <Ionicons
      name={
        selectionMode
          ? "close"
          : "checkmark-circle-outline"
      }
      size={28}
      color="#2563EB"
    />
  </TouchableOpacity>
</View>
      </View>

{toast ? (
  <View style={styles.toast}>
    <Ionicons
      name="checkmark-circle"
      size={20}
      color="#fff"
    />

    <Text style={styles.toastText}>
      {toast}
    </Text>
  </View>
) : null}

      {/* Filters */}

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            activeTab === "All" &&
              styles.activeFilter,
          ]}
          onPress={() =>
            setActiveTab("All")
          }
        >
          <Text
            style={[
              styles.filterText,
              activeTab === "All" &&
                styles.activeText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            activeTab === "Photos" &&
              styles.activeFilter,
          ]}
          onPress={() =>
            setActiveTab("Photos")
          }
        >
          <Text
            style={[
              styles.filterText,
              activeTab === "Photos" &&
                styles.activeText,
            ]}
          >
            Photos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            activeTab === "Videos" &&
              styles.activeFilter,
          ]}
          onPress={() =>
            setActiveTab("Videos")
          }
        >
          <Text
            style={[
              styles.filterText,
              activeTab === "Videos" &&
                styles.activeText,
            ]}
          >
            Videos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Gallery */}

      <ScrollView
  showsVerticalScrollIndicator={
    false
  }
>
  <View style={styles.grid}>

    {(activeTab === "All"
      ? media
      : activeTab === "Photos"
      ? photos
      : videos
    ).map(
      (item, index) => (
        <TouchableOpacity
          key={item.id}
          style={
            styles.imageContainer
          }
          onPress={() => {

            if (
              selectionMode
            ) {

              if (
                selectedImages.includes(
                  item.id
                )
              ) {
                setSelectedImages(
                  selectedImages.filter(
                    (id) =>
                      id !==
                      item.id
                  )
                );
              } else {
                setSelectedImages(
                  [
                    ...selectedImages,
                    item.id,
                  ]
                );
              }

            } else {

              if (
                item.type ===
                "image"
              ) {
                navigation.navigate(
                  "Gallery",
                  {
                    images:
                      activeTab ===
                      "All"
                        ? media.filter(
                            (
                              x
                            ) =>
                              x.type ===
                              "image"
                          )
                        : photos,
                    index,
                  }
                );
              } else {
                navigation.navigate(
                  "VideoGallery",
                  {
                    videos:
                      activeTab ===
                      "All"
                        ? media.filter(
                            (
                              x
                            ) =>
                              x.type ===
                              "video"
                          )
                        : videos,
                    index,
                  }
                );
              }

            }
          }}
        >

          {item.type ===
          "image" ? (
            <Image
              source={{
                uri:
                  item.mediaUrl,
              }}
              style={
                styles.image
              }
            />
          ) : (
            <View>
              <VideoThumbnail
  uri={item.mediaUrl}
/>
              <View
                style={{
                  position:
                    "absolute",
                  top: "35%",
                  left: "35%",
                }}
              >
                <Ionicons
                  name="play-circle"
                  size={
                    50
                  }
                  color="#fff"
                />
              </View>
            </View>
          )}

          {selectionMode && (
            <View
              style={
                styles.checkbox
              }
            >
              <Ionicons
                name={
                  selectedImages.includes(
                    item.id
                  )
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={26}
                color={
                  selectedImages.includes(
                    item.id
                  )
                    ? "#16A34A"
                    : "#fff"
                }
              />
            </View>
          )}
        </TouchableOpacity>
      )
    )}

  </View>
</ScrollView>

      {selectionMode &&
selectedImages.length >
  0 && (
  <View
    style={{
      position:
        "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 80,
      backgroundColor:
        "#fff",
      flexDirection:
        "row",
      justifyContent:
        "space-evenly",
      alignItems:
        "center",
      elevation: 20,
    }}
  >
    <TouchableOpacity
      onPress={
        deleteImages
      }
    >
      <Ionicons
        name="trash"
        size={32}
        color="red"
      />
      <Text>
        Delete
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={
        downloadImages
      }
    >
      <Ionicons
        name="download"
        size={32}
        color="#2563EB"
      />
      <Text>
        Download
      </Text>
    </TouchableOpacity>
  </View>
)}

      {/* Floating Button */}
{!selectionMode && (
  <TouchableOpacity
    style={styles.fab}
    onPress={pickMedia}
  >
    <Ionicons
      name="add"
      size={30}
      color="#fff"
    />
  </TouchableOpacity>
)}
    </SafeAreaView>
  );
}