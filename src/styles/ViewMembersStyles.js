import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F8F9FD",
},

header:{
flexDirection:"row",
alignItems:"center",
paddingHorizontal:20,
paddingTop:10,
paddingBottom:20,
},

backButton:{
width:44,
height:44,
borderRadius:22,
backgroundColor:"#fff",
justifyContent:"center",
alignItems:"center",
elevation:3,
},

headerText:{
marginLeft:15,
},

title:{
fontSize:26,
fontWeight:"700",
color:"#111",
},

subtitle:{
fontSize:14,
color:"#777",
marginTop:3,
},

memberCount:{
marginLeft:20,
marginBottom:15,
fontSize:14,
fontWeight:"600",
color:"#777",
},

memberCard:{
backgroundColor:"#fff",
marginHorizontal:18,
marginBottom:12,
borderRadius:18,
padding:15,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
elevation:2,
},

leftSection:{
flexDirection:"row",
alignItems:"center",
},

avatar:{
width:58,
height:58,
borderRadius:29,
backgroundColor:"#E9E5FF",
},

info:{
marginLeft:14,
},

username:{
fontSize:17,
fontWeight:"700",
color:"#111",
},

adminText:{
marginTop:4,
fontSize:13,
fontWeight:"600",
color:"#7C4DFF",
},

removeButton:{
width:42,
height:42,
borderRadius:21,
backgroundColor:"#FFF2F2",
justifyContent:"center",
alignItems:"center",
},

emptyContainer:{
paddingTop:100,
alignItems:"center",
},

emptyTitle:{
marginTop:15,
fontSize:22,
fontWeight:"700",
},

emptySubtitle:{
marginTop:8,
color:"#777",
textAlign:"center",
},

});