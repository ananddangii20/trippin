import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
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

    marginTop: height * 0.01,
    marginBottom: height * 0.035,
  },

  backButton: {
    width: width * 0.11,
    height: width * 0.11,

    borderRadius: width * 0.055,

    backgroundColor: "#F8FBFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,

    borderWidth: 1,
    borderColor: "#DCEBFF",
  },

  headerTitle: {
    fontSize: width * 0.07,
    fontWeight: "700",
    color: "#1E293B",
  },

  profileCard: {
    backgroundColor: "rgba(255,255,255,0.88)",

    borderRadius: 24,
    padding: 20,

    marginBottom: 25,

    borderWidth: 1,
    borderColor: "#DCEBFF",

    shadowColor: "#2563EB",
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 4,
  },

  profileTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#DCEBFF",
    marginVertical: 18,
  },

  statsContainer: {
    flexDirection: "row",
  },

  statBox: {
    flex: 1,
    alignItems: "center",
  },

  statNumber: {
    fontSize: width * 0.05,
    fontWeight: "700",
    color: "#2563EB",
  },

  statLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 5,
  },

  menuItem: {
    backgroundColor: "rgba(255,255,255,0.88)",

    borderRadius: 20,

    paddingHorizontal: 18,
    paddingVertical: 18,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 14,

    borderWidth: 1,
    borderColor: "#DCEBFF",

    shadowColor: "#2563EB",
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 2,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 15,

    fontSize: 16,
    fontWeight: "500",

    color: "#1E293B",
  },

  icon: {
    color: "#2563EB",
  },

  scrollContent: {
    paddingBottom: 120,
  },
});