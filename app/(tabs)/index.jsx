import { Redirect } from "expo-router";
import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import {auth} from "../../config/FireBaseConfig"
export default function HomeScreen() {
  return (
    <View>
      <Text>Home screen</Text>
      <Button title="Logout" onPress={() => signOut(auth)} />
    </View>
  );
}
