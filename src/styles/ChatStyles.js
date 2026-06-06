import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor:
      "#eee",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  messageContainer: {
    marginBottom: 12,
  },

  left: {
    alignItems:
      "flex-start",
  },

  right: {
    alignItems:
      "flex-end",
  },

  username: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
    marginLeft: 5,
  },

  bubble: {
    padding: 12,
    borderRadius: 15,
    maxWidth: "75%",
  },

  myBubble: {
    backgroundColor:
      "#7C4DFF",
  },

  otherBubble: {
    backgroundColor:
      "#EFEFEF",
  },

  messageText: {
    color: "#FFF",
    fontSize: 15,
  },

  inputRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor:
      "#eee",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor:
      "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 48,
  },

  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor:
      "#7C4DFF",
    justifyContent:
      "center",
    alignItems: "center",
    marginLeft: 10,
  },
});