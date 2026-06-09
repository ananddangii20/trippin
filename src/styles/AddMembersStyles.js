import {
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } =
  Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBFF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.015,
    paddingBottom: height * 0.025,
  },

  backButton: {
    width: width * 0.11,
    height: width * 0.11,

    borderRadius: width * 0.055,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: width * 0.04,

    borderWidth: 1,
    borderColor: "#DCEBFF",

    elevation: 3,
  },

  title: {
    fontSize: width * 0.065,
    fontWeight: "700",
    color: "#1E293B",
  },

  subtitle: {
    color: "#64748B",
    marginTop: 4,
    fontSize: width * 0.035,
  },

  searchBox: {
    marginHorizontal: width * 0.05,

    backgroundColor:
      "rgba(255,255,255,0.95)",

    borderRadius: 18,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,

    marginBottom: 20,

    borderWidth: 1,
    borderColor: "#DCEBFF",

    elevation: 2,
  },

  input: {
    flex: 1,
    height: 54,
    marginLeft: 10,
    fontSize: 15,
    color: "#1E293B",
  },

  card: {
    backgroundColor:
      "rgba(255,255,255,0.95)",

    marginHorizontal: width * 0.05,
    marginBottom: 12,

    borderRadius: 20,

    padding: 15,

    flexDirection: "row",
    justifyContent:
      "space-between",

    alignItems: "center",

    borderWidth: 1,
    borderColor: "#DCEBFF",

    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: width * 0.14,
    height: width * 0.14,

    borderRadius:
      width * 0.07,

    backgroundColor:
      "#EAF2FF",

    borderWidth: 2,
    borderColor: "#DCEBFF",
  },

  info: {
    marginLeft: 14,
    flex: 1,
  },

  username: {
    fontSize: width * 0.04,
    fontWeight: "700",
    color: "#1E293B",
  },

  bio: {
    color: "#64748B",
    marginTop: 3,
    fontSize: width * 0.032,
  },

  addButton: {
    backgroundColor: "#2563EB",

    paddingHorizontal: 18,
    paddingVertical: 10,

    borderRadius: 12,
  },

  addText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  addedButton: {
    backgroundColor: "#E8F5E9",

    paddingHorizontal: 18,
    paddingVertical: 10,

    borderRadius: 12,
  },

  addedText: {
    color: "#2E7D32",
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.4)",

    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "85%",

    backgroundColor: "#FFFFFF",

    borderRadius: 28,

    padding: 25,

    alignItems: "center",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "700",

    color: "#1E293B",

    marginTop: 15,
  },

  modalSubtitle: {
    fontSize: 15,

    color: "#64748B",

    marginTop: 8,

    textAlign: "center",
  },

  modalButton: {
    marginTop: 25,

    backgroundColor: "#2563EB",

    paddingHorizontal: 35,
    paddingVertical: 12,

    borderRadius: 14,
  },

  modalButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});