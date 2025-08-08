import { TextInput, View } from "react-native";
import styles from "./Input.style";
const Input = ({ inputText,value ,onchangeText,isSecure}) => {
  return (
   <View style={styles.container}>
<TextInput placeholder={inputText} style={styles.input}  value={value} onChangeText={onchangeText } secureTextEntry={isSecure}/>
   </View>
      
   
  );
};
export default Input;
