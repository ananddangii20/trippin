import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F4F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E7DEFF",
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },

  profileCard: {
  backgroundColor: "#F4F0FF",
  borderRadius: 24,
  padding: 20,
  marginBottom: 25,

  borderWidth: 1,
  borderColor: "#E7DEFF",
},

profileTop: {
  flexDirection: "row",
  alignItems: "center",
},

divider: {
  height: 1,
  backgroundColor: "#DDD4FF",
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
  fontSize: 20,
  fontWeight: "700",
  color: "#6A40F4",
},

statLabel: {
  fontSize: 12,
  color: "#666",
  marginTop: 5,
},

  menuItem: {
    backgroundColor: "#F4F0FF",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 18,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 14,

    borderWidth: 1,
    borderColor: "#E7DEFF",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
  },

  icon: {
    color: "#6A40F4",
  },

  scrollContent: {
    paddingBottom: 120,
  },
});