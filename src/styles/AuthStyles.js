import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.78)",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.03,
  },

  logo: {
    width: width * 0.75,
    height: width * 0.28,
    alignSelf: "center",
    marginBottom: height * 0.025,
transform:[{scale:1.8}]
  },

  title: {
    fontSize: width * 0.085,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
  },

  subtitle: {
    fontSize: width * 0.04,
    color: "#64748B",
    textAlign: "center",
    marginTop: height * 0.01,
    lineHeight: width * 0.06,
    paddingHorizontal: width * 0.04,
  },

  form: {
    marginTop: height * 0.04,
    gap: height * 0.018,
  },

  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.95)",

    borderWidth: 1.5,
    borderColor: "#DCEBFF",

    borderRadius: width * 0.045,

    paddingHorizontal: width * 0.045,
    paddingVertical: height * 0.02,

    fontSize: width * 0.04,
    color: "#1E293B",

    shadowColor: "#2563EB",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  button: {
    width: "100%",
    backgroundColor: "#2563EB",

    paddingVertical: height * 0.022,
    borderRadius: width * 0.05,

    alignItems: "center",

    shadowColor: "#2563EB",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.042,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  divider: {
    color: "#94A3B8",
    textAlign: "center",
    marginVertical: height * 0.008,
    fontWeight: "600",
    fontSize: width * 0.035,
  },

  googleButton: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.95)",

    borderWidth: 1.5,
    borderColor: "#DCEBFF",

    paddingVertical: height * 0.02,
    borderRadius: width * 0.05,

    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: width * 0.025,
  },

  googleText: {
    color: "#1E293B",
    fontSize: width * 0.04,
    fontWeight: "700",
  },

  error: {
    color: "#DC2626",
    fontSize: width * 0.035,
    textAlign: "center",
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.02,
    flexWrap: "wrap",
  },

  switchText: {
    color: "#64748B",
    fontSize: width * 0.038,
  },

  switchLink: {
    color: "#2563EB",
    fontSize: width * 0.038,
    fontWeight: "800",
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: height * 0.01,
    marginBottom: height * 0.01,
  },

  authCard: {
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: width * 0.07,
    padding: width * 0.06,
  },
});