import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },

  subtitle: {
    color: "#777",
    marginTop: 5,
    fontSize: 14,
  },

  searchBox: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  input: {
    flex: 1,
    height: 52,
    marginLeft: 10,
    fontSize: 15,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 18,

    padding: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "#E9E5FF",
  },

  info: {
    marginLeft: 14,
  },

  username: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  bio: {
    color: "#888",
    marginTop: 3,
    fontSize: 13,
  },

  addButton: {
    backgroundColor: "#7C4DFF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },

  addText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  addedButton:{
backgroundColor:"#E8F5E9",
paddingHorizontal:18,
paddingVertical:10,
borderRadius:12,
},

addedText:{
color:"#2E7D32",
fontWeight:"700",
},

modalOverlay:{
flex:1,
backgroundColor:
"rgba(0,0,0,0.45)",
justifyContent:"center",
alignItems:"center",
},

modalCard:{
backgroundColor:"#fff",
width:"82%",
borderRadius:28,
padding:25,
alignItems:"center",
},

modalTitle:{
fontSize:24,
fontWeight:"700",
marginTop:15,
},

modalSubtitle:{
fontSize:15,
color:"#777",
marginTop:8,
textAlign:"center",
},

modalButton:{
marginTop:25,
backgroundColor:"#7C4DFF",
paddingHorizontal:35,
paddingVertical:12,
borderRadius:14,
},

modalButtonText:{
color:"#fff",
fontWeight:"700",
fontSize:16,
},
backButton: {
  width: 45,
  height: 45,
  borderRadius: 22.5,
  backgroundColor: "#FFFFFF",

  justifyContent: "center",
  alignItems: "center",

  marginRight: 15,

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
},

header: {
  flexDirection: "row",
  alignItems: "center",

  paddingHorizontal: 20,
  paddingTop: 10,
  paddingBottom: 20,
},
});