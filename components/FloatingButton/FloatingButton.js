import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import styles from "./FloatingButton.style"
const FloatingButton=({onPress,icon})=>{
    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
<Ionicons name={icon} size={40} color="white"/>

        </TouchableOpacity>
    )

}
export default FloatingButton;