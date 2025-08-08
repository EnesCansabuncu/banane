import { SafeAreaView, FlatList, View, Text } from "react-native";
import { useState, useEffect } from "react";
import FloatingButton from "../../components/FloatingButton";
import ContentInput from "../../components/modal/ContentInput";
import styles from "./MessageCard.style";

// Firebase nesnelerini doğru şekilde import edin
import { database, auth } from "../../firebaseConfig";
import { ref, push, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const MessageCard = () => {
  // Modal'ın görünürlüğünü yönetmek için state
  const [inputModalVisible, setInputModalVisible] = useState(false);

  // Kullanıcı oturumunu saklamak için state
  const [user, setUser] = useState(null);

  // Mesajları saklamak için yeni state
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    // Kullanıcı oturumundaki değişiklikleri izlemek için gözlemci oluştur
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Veritabanı değişikliklerini dinlemek için onValue'yu kullanın
    const messagesRef = ref(database, "messages/");
    const unsubscribeDB = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Firebase'den gelen objeyi bir diziye dönüştür
        const parsedData = Object.keys(data).map((key) => {
          return {
            id: key, // FlatList için benzersiz bir anahtar (key)
            ...data[key],
          };
        });
        // Tarihe göre sıralama (en son mesaj en üstte)
        parsedData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMessageList(parsedData);
      } else {
        setMessageList([]); // Veri yoksa boş dizi ata
      }
    });

    // Bileşen ayrıldığında (unmount) gözlemcileri temizle
    return () => {
      unsubscribeAuth();
      unsubscribeDB();
    };
  }, []);

  // Mesaj gönderme fonksiyonu
  function handleSendContent(content) {
    if (!user) {
      console.log("Kullanıcı oturumu yok. Mesaj gönderilemiyor.");
      return;
    }

    if (!database) {
      console.error("Database bağlantısı yok.");
      return;
    }

    const contentObj = {
      text: content,
      username: user.email.split("@")[0],
      date: new Date().toISOString(),
    };

    try {
      // Firebase Realtime Database'e referans al
      const messagesRef = ref(database, "messages/");

      // push fonksiyonu ile yeni veriyi ekle
      push(messagesRef, contentObj)
        .then(() => {
          console.log("Mesaj başarıyla gönderildi.");
          setInputModalVisible(false); // Modal'ı kapat
        })
        .catch((error) => {
          console.error("Mesaj gönderilirken hata oluştu: ", error);
        });
    } catch (error) {
      console.error("Firebase işlemi sırasında hata: ", error);
    }
  }

  // Modal'ı açıp kapatan fonksiyon
  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messageList} // Mesajları içeren state'i veriyoruz
        renderItem={({ item }) => (
          // Her bir mesaj öğesi için nasıl bir bileşen çizileceğini tanımlıyoruz
          <View style={styles.messageItem}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id} // Her öğe için benzersiz bir anahtar belirliyoruz
      />
      <FloatingButton icon="add" onPress={handleInputToggle} />
      <ContentInput
        visible={inputModalVisible}
        onclose={handleInputToggle}
        onSend={handleSendContent}
      />
    </SafeAreaView>
  );
};

export default MessageCard;