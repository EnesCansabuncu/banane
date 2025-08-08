import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/auth/Login";
import Sign from "./pages/auth/Sign";
import FlashMessage from "react-native-flash-message";
import MessageCard from "./pages/MessageCard/MessageCard";
  const Stack = createStackNavigator();
export default function App() {

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
          
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="MessageCard" component={MessageCard} />
      
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
      
        
         
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
