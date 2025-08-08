export default function (errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Geçersiz e-posta adresi";
    case "auth/email-already-in-use": // ✅ client tarafı doğru kod
      return "Bu e-posta adresi ile zaten kayıtlı bir kullanıcı var";
    case "auth/user-not-found":
      return "Kullanıcı bulunamadı";
    case "auth/wrong-password": // ekledim çünkü çok sık çıkar
      return "Şifre hatalı";
    default:
      return errorCode;
  }
}
