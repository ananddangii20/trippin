import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  // Background (same as Auth)
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlayScreen: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.78)",
  },

  container: {
    flex: 1,
    paddingBottom:50
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    width: 70,
    height: 40,
    transform: [{ scale: 1.6 }],
    marginTop: 2,
    marginLeft: 15,
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  // Logo Blue
  plusButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563EB",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#2563EB",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
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

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
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
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  cardDate: {
    color: "#FFFFFF",
    marginTop: 5,
  },

  // Sand Accent
  badge: {
    alignSelf: "flex-end",
    backgroundColor: "#F4C16D",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 10,
  },

  badgeText: {
    color: "#1E293B",
    fontWeight: "700",
  },

navbar: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,

  height: 80,

  backgroundColor: "rgba(255,255,255,0.98)",

  borderTopWidth: 1,
  borderTopColor: "#DCEBFF",

  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: -2,
  },

  elevation: 10,
},

navItem: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
},

  activeNav: {
    color: "#2563EB",
    fontWeight: "700",
  },

  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginHorizontal: 20,
    marginVertical: 20,

    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 20,

    paddingVertical: 16,
    paddingHorizontal: 10,
  },

  actionItem: {
    alignItems: "center",
    flex: 1,
  },

  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: "#1E293B",
  },

  timelineContainer: {
    backgroundColor: "rgba(255,255,255,0.82)",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  viewAll: {
    color: "#2563EB",
    fontWeight: "700",
  },

  timelineItem: {
    flexDirection: "row",
    marginBottom: 20,
  },

  // Sand Accent
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#F4C16D",
    marginTop: 4,
  },

  timelineContent: {
    marginLeft: 15,
  },

  timelineTime: {
    fontSize: 12,
    color: "#64748B",
  },

  timelineTitle: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
  },
});