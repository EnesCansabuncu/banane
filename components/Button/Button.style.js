import { StyleSheet } from "react-native";

// Temel stilleri bir JavaScript objesi olarak tanımlayın.
// Bu objeyi doğrudan StyleSheet.create'e geçirmiyoruz.
const base_style = {
  button: {
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
    padding: 5, // Butonların daha dolgun görünmesi için padding artırıldı.
  },
  text: {
    fontWeight: "bold",
  },
  button_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // İçeriği yatayda ortalamak için.
  },
};

// Temaları tek bir StyleSheet.create çağrısı içinde oluşturun.
export default StyleSheet.create({
  primary: {
    button: {
      ...base_style.button,
      backgroundColor: "#5E936C",
    },
    text: {
      ...base_style.text,
      color: "white",
    },
    button_container: {
      ...base_style.button_container,
    },
  },
  secondary: {
    button: {
      ...base_style.button,
      backgroundColor: "white",
      borderColor: "#5E936C", // Bordür rengi, primary ile tutarlı olması için değiştirildi.
      borderWidth: 2,
    },
    text: {
      ...base_style.text,
      color: "#5E936C", // Beyaz arka plan üzerinde okunur olması için metin rengi değiştirildi.
    },
    button_container: {
      ...base_style.button_container,
    },
  },
});