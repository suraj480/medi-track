import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import MedicationCardItem from "../../components/MedicationCardItem";
import { Ionicons } from "@expo/vector-icons";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import {db } from '../../config/FireBaseConfig'
import moment from "moment";
export default function MedicationActionModal() {
  const medicine = useLocalSearchParams();
  console.log("medicine", medicine);
  const router = useRouter();
  const UpdateActionStatus = async (status) => {
    try {
      const docRef = doc(db, "medication", medicine?.docId);
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time: moment().format("LT"),
          date: medicine?.selectedDate,
        }),
      });
      Alert.alert(status, "Response saved!", [
        {
          text: "ok",
          onPress: () => router.replace("(tabs)"),
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/notification.gif")}
        style={{
          width: 80,
          height: 80,
        }}
      />
      <Text style={{ fontSize: 18 }}>{medicine?.selectedDate}</Text>
      <Text style={{ fontSize: 30, fontWeight: "bold", color: Colors.PRIMARY }}>
        {medicine?.reminder}
      </Text>

      <Text style={{ fontSize: 18 }}>It's time to take</Text>
      <MedicationCardItem medicine={medicine} />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => UpdateActionStatus("Missed")}
        >
          <Ionicons name="close-outline" size={24} color="red" />
          <Text
            style={{
              fontSize: 20,
              color: "red",
            }}
          >
            Missed
          </Text>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            style={styles.successBtn}
            onPress={() => UpdateActionStatus("Taken")}
          >
            <Ionicons name="checkmark-outline" size={24} color="white" />
            <Text
              style={{
                fontSize: 20,
                color: "white",
              }}
            >
              Taken
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 25,
        }}
        onPress={() => router.back()}
      >
        <Ionicons name="close-circle" size={44} color={Colors.GRAY} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 25,
  },
  closeBtn: {
    padding: 10,
    flexDirection: "row",
    gap: 6,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "red",
    borderRadius: 10,
  },
  successBtn: {
    padding: 10,
    flexDirection: "row",
    gap: 6,
    backgroundColor: Colors.GREEN,
    alignItems: "center",
    borderRadius: 10,
  },
});
