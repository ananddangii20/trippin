import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.86)",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 30,
    gap: 18,
  },

  logo: {
    width: "100%",
    height: 120,
    alignSelf: "center",
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#222",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 23,
  },

  form: {
    gap: 14,
    marginTop: 10,
  },

  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EEEAFD",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: "#222",
  },

  button: {
    width: "100%",
    backgroundColor: "#5B35F2",
    paddingVertical: 17,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  googleButton: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6E0FF",
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  googleText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "700",
  },

  divider: {
    color: "#777",
    textAlign: "center",
    fontWeight: "600",
  },

  error: {
    color: "#D92D20",
    fontSize: 14,
    textAlign: "center",
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  switchText: {
    color: "#555",
    fontSize: 15,
  },

  switchLink: {
    color: "#5B35F2",
    fontSize: 15,
    fontWeight: "800",
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
});
