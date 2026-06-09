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
    backgroundColor: "rgba(255,255,255,0.78)",
  },

  header: {
  flexDirection: "row",
  alignItems: "center",

  paddingHorizontal: 20,
  paddingTop: 15,
  paddingBottom: 15,

  backgroundColor: "rgba(255,255,255,0.85)",
},

headerSide: {
  width: 40,
  alignItems: "center",
  justifyContent: "center",
},

headerCenter: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
},

title: {
  fontSize: 20,
  fontWeight: "700",
  color: "#1E293B",
  textAlign: "center",
},

date: {
  fontSize: 13,
  color: "#64748B",
  marginTop: 3,
  textAlign: "center",
},

  heroImage: {
    height: height * 0.28,

    marginHorizontal: width * 0.05,
    marginTop: height * 0.02,

    justifyContent: "flex-end",

    borderRadius: width * 0.05,
    overflow: "hidden",
  },

  heroImageRadius: {
    width: "100%",
    height: "100%",
    borderRadius: width * 0.05,
  },

  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: width * 0.04,
  },

  avatar: {
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: width * 0.055,

    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  moreAvatar: {
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: width * 0.055,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    marginLeft: -12,
  },

  moreText: {
    fontWeight: "700",
    color: "#1E293B",
    fontSize: width * 0.032,
  },

  budgetCard: {
    marginHorizontal: width * 0.05,
    marginTop: height * 0.02,

    backgroundColor: "rgba(255,255,255,0.88)",

    borderRadius: width * 0.05,

    padding: width * 0.05,

    flexDirection: "row",
    justifyContent: "space-between",

    elevation: 4,
  },

  cardLabel: {
    fontSize: width * 0.032,
    color: "#64748B",
    marginBottom: 8,
  },

  bigText: {
    fontSize: width * 0.07,
    fontWeight: "700",
    color: "#1E293B",
  },

  greenText: {
    fontSize: width * 0.07,
    fontWeight: "700",
    color: "#22C55E",
  },

  progressCard: {
    backgroundColor: "rgba(255,255,255,0.88)",

    marginHorizontal: width * 0.05,

    borderRadius: width * 0.05,

    padding: width * 0.05,

    marginTop: height * 0.02,

    elevation: 4,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  progressTitle: {
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#1E293B",
  },

  progressPercent: {
    fontSize: width * 0.04,
    fontWeight: "700",
    color: "#2563EB",
  },

  progressTrack: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 20,
  },

  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginHorizontal: width * 0.05,
    marginTop: height * 0.025,
    marginBottom: height * 0.02,

    backgroundColor: "rgba(255,255,255,0.88)",

    paddingVertical: 18,
    paddingHorizontal: 10,

    borderRadius: width * 0.05,

    elevation: 3,
  },

  actionItem: {
    alignItems: "center",
    flex: 1,
  },

  actionText: {
    marginTop: 8,
    fontSize: width * 0.03,
    color: "#1E293B",
    fontWeight: "500",
  },

  timelineContainer: {
    backgroundColor: "rgba(255,255,255,0.88)",

    marginHorizontal: width * 0.05,

    borderRadius: width * 0.05,

    padding: width * 0.05,

    marginBottom: height * 0.03,

    elevation: 4,
  },

  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#1E293B",
  },

  viewAll: {
    color: "#2563EB",
    fontWeight: "700",
  },

  timelineItem: {
    flexDirection: "row",
    marginBottom: 25,
  },

  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,

    backgroundColor: "#F4C16D",

    marginTop: 5,
  },

  timelineContent: {
    marginLeft: 15,
    flex: 1,
  },

  timelineTime: {
    fontSize: width * 0.03,
    color: "#64748B",
    marginBottom: 3,
  },

  timelineTitle: {
    fontSize: width * 0.038,
    color: "#1E293B",
    fontWeight: "500",
  },

  navbar: {
    height: 80,

    backgroundColor: "rgba(255,255,255,0.95)",

    borderTopWidth: 1,
    borderTopColor: "#DCEBFF",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    fontSize: width * 0.03,
    color: "#94A3B8",
    marginTop: 3,
  },

  activeNav: {
    fontSize: width * 0.03,
    color: "#2563EB",
    fontWeight: "700",
    marginTop: 3,
  },
});