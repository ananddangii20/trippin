import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

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
    backgroundColor: "rgba(255,255,255,0.72)",
  },

  header: {
    height: height * 0.09,

    backgroundColor: "rgba(255,255,255,0.85)",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: width * 0.05,

    borderBottomWidth: 1,
    borderBottomColor: "#DCEBFF",

    elevation: 2,
  },

  headerSide: {
    width: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: width * 0.05,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
  },

  subtitle: {
    fontSize: width * 0.032,
    color: "#64748B",
    marginTop: 2,
    textAlign: "center",
  },

  chatContainer: {
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.02,
  },

  messageContainer: {
    marginBottom: height * 0.02,
  },

  left: {
    alignItems: "flex-start",
  },

  right: {
    alignItems: "flex-end",
  },

  username: {
    fontSize: width * 0.03,
    color: "#64748B",
    marginBottom: 5,
    marginHorizontal: 10,
    fontWeight: "600",
  },

  bubble: {
    maxWidth: "82%",
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    borderRadius: width * 0.06,
  },

  myBubble: {
    backgroundColor: "#2563EB",

    borderBottomRightRadius: 8,

    shadowColor: "#2563EB",
    shadowOpacity: 0.15,
    shadowRadius: 8,

    elevation: 3,
  },

  otherBubble: {
    backgroundColor: "rgba(255,255,255,0.92)",

    borderBottomLeftRadius: 8,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 2,
  },

  messageText: {
    fontSize: width * 0.038,
    lineHeight: width * 0.055,
  },

  myMessage: {
    color: "#FFFFFF",
  },

  otherMessage: {
    color: "#1E293B",
  },

  time: {
    fontSize: width * 0.024,
    marginTop: 5,
    alignSelf: "flex-end",
    opacity: 0.75,
  },

  myTime: {
    color: "#E5E7EB",
  },

  otherTime: {
    color: "#64748B",
  },

  inputWrapper: {
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,

    backgroundColor: "rgba(255,255,255,0.92)",

    borderTopWidth: 1,
    borderTopColor: "#DCEBFF",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,

    backgroundColor: "#F8FBFF",

    minHeight: height * 0.065,
    maxHeight: height * 0.15,

    borderRadius: width * 0.07,

    paddingHorizontal: width * 0.045,

    fontSize: width * 0.038,

    color: "#1E293B",

    borderWidth: 1,
    borderColor: "#DCEBFF",
  },

  sendButton: {
    width: width * 0.13,
    height: width * 0.13,

    borderRadius: width * 0.065,

    backgroundColor: "#2563EB",

    justifyContent: "center",
    alignItems: "center",

    marginLeft: width * 0.025,

    shadowColor: "#2563EB",
    shadowOpacity: 0.2,
    shadowRadius: 8,

    elevation: 4,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: width * 0.06,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 15,
  },

  emptySubtitle: {
    marginTop: 8,
    color: "#64748B",
    fontSize: width * 0.038,
    textAlign: "center",
    paddingHorizontal: width * 0.08,
  },
});