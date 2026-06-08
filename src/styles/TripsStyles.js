import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    width: 120,
    height: 40,
   transform: [{ scale: 1.6 }],
   marginTop: 2
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  plusButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#6A40F4",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },

card: {
  height: 190,
  marginHorizontal: 20,
  marginBottom: 18,
  justifyContent: "flex-end",
  borderRadius: 20,
  overflow: "hidden",
},

cardImage: {
  borderRadius: 20,
},

  overlay: {
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 20,
    padding: 15,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  cardDate: {
    color: "#fff",
    marginTop: 5,
  },

  badge: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 10,
  },

  badgeText: {
    color: "#6A40F4",
    fontWeight: "600",
  },

  navbar: {
    height: 75,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navItem: {
    alignItems: "center",
  },

  activeNav: {
    color: "#6A40F4",
    fontWeight: "600",
  },

  actionContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: 20,
  marginVertical: 20,
},

actionItem: {
  alignItems: "center",
},

actionText: {
  marginTop: 8,
  fontSize: 12,
},

timelineContainer: {
  backgroundColor: "#fff",
  marginHorizontal: 20,
  borderRadius: 20,
  padding: 20,
  marginBottom: 20,
},

timelineHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 20,
},

viewAll: {
  color: "#7C4DFF",
  fontWeight: "600",
},

timelineItem: {
  flexDirection: "row",
  marginBottom: 20,
},

timelineDot: {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: "#7C4DFF",
  marginTop: 4,
},

timelineContent: {
  marginLeft: 15,
},

timelineTime: {
  fontSize: 12,
  color: "#777",
},

timelineTitle: {
  marginTop: 4,
  fontSize: 15,
  fontWeight: "500",
},

});

