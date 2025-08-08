import { KeyboardAvoidingView, Platform, StatusBar, Text, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import styles from "./Sign.style";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { auth } from "../../../firebaseConfig"; 
import authErrorMessageParser from "../../../utils/authErrorMessageParser";

const Sign = ({ navigation }) => {
  const initialFormValues = { usermail: "", password: "", repassword: "" };

  const handleLogin = () => navigation.goBack();

  const handleFormSubmit = async (values) => {
    // Şifrelerin eşleşip eşleşmediğini kontrol et
    if (values.password !== values.repassword) {
      showMessage({
        message: "Şifreler eşleşmiyor.",
        type: "danger",
      });
      return; // Şifreler eşleşmiyorsa işlemi durdur
    }

    try {
      // Firebase ile yeni kullanıcı oluştur
      await createUserWithEmailAndPassword(auth, values.usermail, values.password);

      // Başarılı olursa mesaj göster ve yönlendir
      showMessage({
        message: "Kullanıcı başarıyla oluşturuldu.",
        type: "success",
      });
      navigation.navigate("Login");

    } catch (error) {
      // Hata oluştuğunda bu blok çalışır
      console.error(error); // Hatanın detaylarını konsolda görmek için
      
      // Hata mesajını kullanıcıya göster
      showMessage({
        message: authErrorMessageParser(error.code), // Hata kodunu anlaşılır bir mesaja çevirir
        type: "danger",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : StatusBar.currentHeight}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.header}>bana ne?</Text>

          <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
            {({ values, handleChange, handleSubmit }) => (
              <>
                <Input
                  inputText="Epostanızı giriniz"
                  value={values.usermail}
                  onchangeText={handleChange("usermail")}
                />
                <Input
                  inputText="Şifrenizi giriniz"
                  value={values.password}
                  onchangeText={handleChange("password")}
                  isSecure
                />
                <Input
                  inputText="Şifrenizi tekrar giriniz"
                  value={values.repassword}
                  onchangeText={handleChange("repassword")}
                  isSecure
                />
                <Button text="Kayıt ol" theme="secondary" onPress={handleSubmit} icon="person-add" />
                <Button text="Geri" theme="primary" onPress={handleLogin} icon="arrow-back" />
              </>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Sign;