import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import styles from "./Button.style";
// Hatalı satır yerine doğru import satırı:
import { Ionicons } from "@expo/vector-icons";

const Button = ({ text, onPress, loading, icon, theme = "primary" }) => {
  return (
    <TouchableOpacity
      style={styles[theme].button}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
                <View style={styles[theme].button_container}>
            {icon && <Ionicons name={icon} color="white" size={30} />}
            <Text style={styles[theme].text}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default Button;