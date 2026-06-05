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
  paddingBottom: height * 0.05,
},

  logo: {
  width: width * 0.95,
  height: width * 0.38,
  marginTop: height * 0.03,
},

  heading: {
    fontSize: width * 0.06,
    fontWeight: "400",
    color: "#222",
    textAlign: "center",
    lineHeight: width * 0.09,
    paddingHorizontal: width * 0.05,
  },

  bottomSection: {
    width: "100%",
  },

  button: {
    width: "100%",
    backgroundColor: "#5B35F2",
    paddingVertical: Math.max(16, height * 0.022),
    borderRadius: 18,
    alignItems: "center",

    shadowColor: "#5B35F2",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "700",
  },

  loginText: {
    textAlign: "center",
    fontSize: width * 0.045,
    fontWeight: "600",
    color: "#222",
    marginTop: 16,
  },
});