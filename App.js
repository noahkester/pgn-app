import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";
import {FirstPage} from "./Login_SignUp";
import LoginPage from "./Login";
import styles from "./Styles";
export default function App() {
  return (
    <View style={styles.container}>
      <LoginPage />

      <StatusBar style="auto" />
    </View>
  );
}
