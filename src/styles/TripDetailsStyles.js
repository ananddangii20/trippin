
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FC",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#fff",
  },

  headerCenter: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
  },

  date: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
    textAlign: "center",
  },
heroImage: {
  height: 230,
  marginHorizontal: 20,
  marginTop: 15,
  justifyContent: "flex-end",

  borderRadius: 20,
  overflow: "hidden",
},

heroImageRadius: {
  width: "100%",
  height: "100%",
  borderRadius: 20,
},

  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#fff",
  },

  moreAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -12,
  },

  moreText: {
    fontWeight: "700",
    color: "#222",
    fontSize: 13,
  },

  budgetCard: {
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 4,
  },

  cardLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },

  bigText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
  },

  greenText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#22C55E",
  },

  progressCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 15,
    elevation: 4,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  progressPercent: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6A40F4",
  },

  progressTrack: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#3AE374",
    borderRadius: 20,
  },

  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
  },

  actionItem: {
    alignItems: "center",
    flex: 1,
  },

  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: "#444",
    fontWeight: "500",
  },

  timelineContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },

  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  viewAll: {
    color: "#6A40F4",
    fontWeight: "600",
  },

  timelineItem: {
    flexDirection: "row",
    marginBottom: 25,
  },

  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#6A40F4",
    marginTop: 5,
  },

  timelineContent: {
    marginLeft: 15,
    flex: 1,
  },

  timelineTime: {
    fontSize: 12,
    color: "#777",
    marginBottom: 3,
  },

  timelineTitle: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
  },

  navbar: {
    height: 75,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    fontSize: 12,
    color: "#999",
    marginTop: 3,
  },

  activeNav: {
    fontSize: 12,
    color: "#6A40F4",
    fontWeight: "700",
    marginTop: 3,
  },
});

