import { Redirect } from "expo-router";
import { View, Text, Button, FlatList } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/FireBaseConfig";
import Header from "../../components/Header";
import EmptyState from "../../components/EmptyState";
import MedicationList from "../../components/MedicationList";
export default function HomeScreen() {
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View
          style={{
            padding: 25,
            backgroundColor: "white",
            height: "100%",
            width: "100%",
          }}
        >
          <Header />

          <MedicationList />
        </View>
      }
    />
  );
}
