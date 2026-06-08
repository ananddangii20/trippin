import React from "react";

import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import ImageViewing from
  "react-native-image-viewing";

export default function GalleryScreen({
  route,
  navigation,
}) {

  const {
    images,
    index,
  } = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          "#000",
      }}
    >

      {/* Header */}

      <View
        style={{
          position:
            "absolute",
          top: 55,
          left: 0,
          right: 0,
          zIndex: 100,
          flexDirection:
            "row",
          alignItems:
            "center",
          justifyContent:
            "center",
        }}
      >

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          style={{
            position:
              "absolute",
            left: 20,
          }}
        >
          <Ionicons
            name="chevron-back"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#fff",
          }}
        >
          Photos
        </Text>

      </View>

      <ImageViewing
        images={images.map(
          (item) => ({
            uri:
              item.mediaUrl,
          })
        )}

        imageIndex={index}

        visible={true}

        presentationStyle="fullScreen"

        backgroundColor="#000"

        swipeToCloseEnabled

        doubleTapToZoomEnabled

        HeaderComponent={() =>
          null
        }

        onRequestClose={() =>
          navigation.goBack()
        }
      />

    </View>
  );
}