import { KeyboardAvoidingView, Platform, StatusBar, Text } from "react-native";
import styles from "./Login.style";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { Formik } from "formik";
import * as Yup from "yup"; 
import {  signInWithEmailAndPassword } from "firebase/auth";
import { showMessage,  } from "react-native-flash-message";
import { auth } from "../../../firebaseConfig"; // ✅ aynı dosya yolu
import authErrorMessageParser from "../../../utils/authErrorMessageParser";



const Login = ({ navigation }) => {
  
  const initialFormValues = {
    usermail: "",
    password: "",
  };
  const loginValidationSchema=Yup.object().shape({
    usermail:Yup.string().email("Geçerli eposta adresi giriniz").required("eposta adresi girişi zorunludur"),
    password:Yup.string().min(6,"Şifre en az 6 karekterli olmalıdır").required("Şifre alanı boş bırakılmaz")

  })
  const handleSignUp = () => {
    navigation.navigate("Sign");
  };
   async function handleFormSubmit(formvalues){
    try {
     await signInWithEmailAndPassword(auth,formvalues.usermail,formvalues.password)
     navigation.navigate("MessageCard")
    } catch (error) {
      console.log(error)
          showMessage({
            message: authErrorMessageParser(error.code),
            type: "danger",
          });
    }
    
    console.log(formvalues)
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        styles.view,
        Platform.OS === "android" && { paddingTop: StatusBar.currentHeight },
      ]}
    >
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit} validationSchema={loginValidationSchema}>{
        ({values,handleSubmit,handleChange})=>( 
        <>
        <Text style={styles.header}>bana ne?</Text>
        <Input inputText="Epostanızı giriniz"  value={values.usermail} onchangeText={handleChange("usermail")}/>
        <Input inputText="Şifrenizi giriniz" value={values.password} onchangeText={handleChange("password")}  isSecure />
                <Button text="Giriş yap" theme="primary" onPress={handleSubmit} icon="log-in" />
         </>
         )
        
        }
        
      </Formik>
      <Button text="Kayıt ol" theme="secondary" onPress={handleSignUp} icon="person-add" />
    </KeyboardAvoidingView>
  );
};
export default Login;
