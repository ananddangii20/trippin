import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 15,
  },

  filterRow: {
    flexDirection: "row",
    marginTop: 25,
    paddingHorizontal: 20,
    paddingBottom : 20,
    gap: 10,
  },

  filterBtn: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  activeFilter: {
    backgroundColor: "#6A40F4",
  },

  filterText: {
    color: "#666",
    fontWeight: "500",
  },

  activeText: {
    color: "#fff",
  },

  // PHOTO GRID

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 90,
  },

  imageContainer: {
    width: "33.33%",
    padding: 4,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },

  // VIDEO GRID

  videoItem: {
    width: "48%",
    height: 220,
    marginBottom: 10,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#000",
  },

  videoThumb: {
    width: "100%",
    height: "100%",
  },

  videoContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
  },

  video: {
    width: "100%",
    height: 230,
    borderRadius: 16,
  },

  // SELECTION

  checkbox: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },

  // TOAST

  toast: {
    backgroundColor: "#16A34A",
    marginHorizontal: 20,
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  toastText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 15,
  },

  // FLOATING BUTTON

  fab: {
    position: "absolute",
    right: 25,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6A40F4",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});