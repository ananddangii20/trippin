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

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
  },

  image: {
    width: "31%",
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 10,
  },

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

  videoContainer: {
  marginHorizontal: 15,
  marginBottom: 20,
},

video: {
  width: "100%",
  height: 230,
  borderRadius: 16,
},

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