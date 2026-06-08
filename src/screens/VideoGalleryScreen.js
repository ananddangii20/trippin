import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  VideoView,
  useVideoPlayer,
} from "expo-video";

const width =
  Dimensions.get(
    "window"
  ).width;

const height =
  Dimensions.get(
    "window"
  ).height;

function VideoItem({
  uri,
  active,
}) {

  const player =
    useVideoPlayer(uri);

  useEffect(() => {

    if (active) {
      player.play();
    } else {
      player.pause();
    }

  }, [active]);

  return (
    <View
      style={{
        width,
        height,
        backgroundColor:
          "#000",
        justifyContent:
          "center",
      }}
    >
      <VideoView
        player={player}
        style={{
          width: "100%",
          height: "75%",
        }}
        nativeControls
        allowsFullscreen
      />
    </View>
  );
}

export default function VideoGalleryScreen({
  route,
  navigation,
}) {

  const {
    videos,
    index,
  } = route.params;

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(index);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          "#000",
      }}
    >

      {/* Back Button */}

      <TouchableOpacity
        style={{
          position:
            "absolute",
          top: 55,
          left: 20,
          zIndex: 100,
          backgroundColor:
            "rgba(0,0,0,0.4)",
          borderRadius: 25,
          padding: 6,
        }}
        onPress={() =>
          navigation.goBack()
        }
      >
        <Ionicons
          name="chevron-back"
          size={30}
          color="#fff"
        />
      </TouchableOpacity>

      <FlatList
        data={videos}
        horizontal
        pagingEnabled
        initialScrollIndex={
          index
        }
        showsHorizontalScrollIndicator={
          false
        }
        getItemLayout={(
          data,
          i
        ) => ({
          length: width,
          offset:
            width * i,
          index: i,
        })}
        onMomentumScrollEnd={(
          e
        ) => {

          const current =
            Math.round(
              e.nativeEvent
                .contentOffset.x /
                width
            );

          setActiveIndex(
            current
          );
        }}
        keyExtractor={(
          item
        ) => item.id}
        renderItem={({
          item,
          index,
        }) => (
          <VideoItem
            uri={
              item.mediaUrl
            }
            active={
              activeIndex ===
              index
            }
          />
        )}
      />

      {/* Counter */}

      <View
        style={{
          position:
            "absolute",
          bottom: 35,
          alignSelf:
            "center",
          backgroundColor:
            "rgba(255,255,255,0.15)",
          paddingHorizontal:
            14,
          paddingVertical: 8,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 15,
            fontWeight:
              "600",
          }}
        >
          {activeIndex + 1}
          {" / "}
          {videos.length}
        </Text>
      </View>

    </View>
  );
}