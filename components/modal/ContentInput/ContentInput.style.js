import { StyleSheet, Dimensionsensions, Dimensions} from "react-native";
  const deviceSize = Dimensions.get("window");
export default StyleSheet.create({
  
container:{
    backgroundColor:"white",
    padding:10,
    margin:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    height:deviceSize/3
}
})