import {
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } =
  Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlayScreen: {
    flex: 1,
    backgroundColor:
      "rgba(255,255,255,0.78)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal:
      width * 0.05,

    paddingTop:
      height * 0.015,

    paddingBottom:
      height * 0.02,
  },

  backButton: {
    width: width * 0.11,
    height: width * 0.11,

    borderRadius:
      width * 0.055,

    backgroundColor:
      "rgba(255,255,255,0.95)",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#DCEBFF",

    elevation: 4,
  },

  headerText: {
    flex: 1,
    marginLeft: width * 0.04,
  },

  title: {
    fontSize: width * 0.065,
    fontWeight: "700",
    color: "#1E293B",
  },

  subtitle: {
    fontSize: width * 0.035,
    color: "#64748B",
    marginTop: 3,
  },

  memberCount: {
    marginHorizontal:
      width * 0.05,

    marginBottom:
      height * 0.018,

    fontSize:
      width * 0.037,

    fontWeight: "600",

    color: "#64748B",
  },

  memberCard: {
    backgroundColor:
      "rgba(255,255,255,0.92)",

    marginHorizontal:
      width * 0.05,

    marginBottom:
      height * 0.015,

    borderRadius:
      width * 0.05,

    padding:
      width * 0.04,

    flexDirection: "row",
    justifyContent:
      "space-between",

    alignItems: "center",

    borderWidth: 1,
    borderColor: "#DCEBFF",

    elevation: 3,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: width * 0.15,
    height: width * 0.15,

    borderRadius:
      width * 0.075,

    backgroundColor:
      "#EAF2FF",

    borderWidth: 2,
    borderColor: "#DCEBFF",
  },

  info: {
    marginLeft:
      width * 0.035,

    flex: 1,
  },

  username: {
    fontSize:
      width * 0.043,

    fontWeight: "700",

    color: "#1E293B",
  },

  adminText: {
    marginTop: 4,

    fontSize:
      width * 0.032,

    fontWeight: "700",

    color: "#2563EB",
  },

  removeButton: {
    width: width * 0.11,
    height: width * 0.11,

    borderRadius:
      width * 0.055,

    backgroundColor:
      "#FFF1F2",

    justifyContent: "center",
    alignItems: "center",
  },

  emptyContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal:
      width * 0.08,
  },

  emptyTitle: {
    marginTop: 15,

    fontSize:
      width * 0.06,

    fontWeight: "700",

    color: "#1E293B",
  },

  emptySubtitle: {
    marginTop: 8,

    color: "#64748B",

    textAlign: "center",

    fontSize:
      width * 0.038,

    lineHeight:
      width * 0.055,
  },
});