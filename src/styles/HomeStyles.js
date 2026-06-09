import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: width * 0.06,
  },

  logo: {
    width: width * 0.59,
    height: width * 0.38,
    marginTop: height * 0.03,
    
  },

  heading: {
    fontFamily: "Pacifico_400Regular",
    fontSize: width * 0.065,
    color: "#2563EB",
    textAlign: "center",
    paddingHorizontal: width * 0.05,
  },

  headingHighlight: {
    color: "#2563EB",
  },

  bottomSection: {
    width: "100%",
  },

  authButtons: {
    marginTop: 82,
    width: "100%",
    gap: 14,
  },

  button: {
    width: "100%",
    backgroundColor: "#2563EB",
    paddingVertical: Math.max(16, height * 0.022),
    borderRadius: 20,
    alignItems: "center",

    shadowColor: "#2563EB",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.045,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  secondaryButton: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderWidth: 1.5,
    borderColor: "#DCEBFF",
    paddingVertical: Math.max(16, height * 0.022),
    borderRadius: 20,
    alignItems: "center",

    shadowColor: "#2563EB",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  secondaryButtonText: {
    color: "#2563EB",
    fontSize: width * 0.045,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  loginText: {
    textAlign: "center",
    fontSize: width * 0.043,
    fontWeight: "600",
    color: "#1E293B",
    marginTop: 18,
  },

  loginHighlight: {
    color: "#2563EB",
    fontWeight: "700",
  },

  contentCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 24,
    padding: 20,
  },
});