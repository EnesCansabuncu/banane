import { View, TextInput } from "react-native";
import styles from "./ContentInput.style";
import Button from "../../Button/Button";
import Modal from 'react-native-modal';
import { useState } from "react";
const ContentInput = ({ visible ,onclose,onSend}) => {
  const [text, setText] = useState("");
  return (
    <Modal 
     isVisible={visible} 
     onSwipeComplete={onclose}
     onBackdropPress={onclose}
       onBackButtonPress={onclose}
       swipeDirection="down"
        
       >
      <View style={styles.container}>
        <TextInput placeholder="Darla hadi milleti" onChangeText={setText} multiline />
        <Button text="Gönder" onPress={()=>onSend(text)} icon="send" />
      </View>
    </Modal>
  );
};
export default ContentInput;
