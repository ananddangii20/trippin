import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },

  header: {
    height: 75,
    backgroundColor: "#FFFFFF",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,

    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",

    elevation: 2,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 13,
    color: "#7B7B7B",
    marginTop: 2,
  },

  chatContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
  },

  messageContainer: {
    marginBottom: 18,
  },

  left: {
    alignItems: "flex-start",
  },

  right: {
    alignItems: "flex-end",
  },

  username: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
    marginHorizontal: 10,
    fontWeight: "600",
  },

  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22,
  },

  myBubble: {
    backgroundColor: "#7C4DFF",

    borderBottomRightRadius: 6,

    shadowColor: "#7C4DFF",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },

  otherBubble: {
    backgroundColor: "#FFFFFF",

    borderBottomLeftRadius: 6,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },

  myMessage: {
    color: "#ffffff",
  },

  otherMessage: {
    color: "#111827",
  },

  time: {
    fontSize: 10,
    marginTop: 5,
    alignSelf: "flex-end",
    opacity: 0.7,
  },

  myTime: {
    color: "#F3F3F3",
  },

  otherTime: {
    color: "#666",
  },

  inputWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,
    borderTopColor: "#F3F3F3",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,

    backgroundColor: "#F5F5F7",

    minHeight: 52,
    maxHeight: 120,

    borderRadius: 26,

    paddingHorizontal: 18,

    fontSize: 15,

    color: "#111827",
  },

  sendButton: {
    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: "#7C4DFF",

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 10,

    shadowColor: "#7C4DFF",
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
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginTop: 15,
  },

  emptySubtitle: {
    marginTop: 8,
    color: "#888",
    fontSize: 15,
    textAlign: "center",
  },
});