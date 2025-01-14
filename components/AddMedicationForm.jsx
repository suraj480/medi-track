import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constant/Colors";
import { TypeList, WhenToTake } from "../constant/Options";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  FormatDate,
  formatDateForText,
  formatTime,
  getDatesRange,
} from "../service/ConvertDateTime";
import { getLocalStorage } from "../service/Storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/FireBaseConfig";
import { router, useRouter } from "expo-router";

export default function AddMedicationForm() {
  const [formData, setFormData] = useState();
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const onHandleInputChanges = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const SaveMedication = async () => {
    console.log("CHECK-1")
    const docId = Date.now().toString();
    console.log("CHECK-2")
    const user = await getLocalStorage("userDetail");
    console.log("CHECK-3")
    // const router = useRouter();
    console.log("CHECK-4")
    if (
      !(
        formData?.name ||
        formData?.type ||
        formData?.dose ||
        formData?.startDate ||
        formData?.endDate
      )
    ) {
      console.log("alert");
      console.log("CHECK-5")
      Alert.alert("Enter all fields");
      return;
    }
    const dates = getDatesRange(formData?.startDate, formData?.endDate);
    setLoading(true);
    console.log("CHECK-6")
    try {console.log("CHECK-1")
      await setDoc(doc(db, "medication", docId), {

        ...formData,
        userEmail: user?.email,
        docId: docId,
        dates: dates,
      });
      setLoading(false);
      console.log("CHECK-7")
      Alert.alert("Great!", "New medication added successfully", {
        text: "Ok",
        onPress: () => router.push("(tabs)"),
      });
      console.log("CHECK-8")
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <Text style={styles.header}>Add New Medication</Text>
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="medkit-outline"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Medicine Name"
          onChangeText={(value) => onHandleInputChanges("name", value)}
        />
      </View>
      {/* Type List */}
      <FlatList
        data={TypeList}
        horizontal
        style={{
          marginTop: 5,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.inputGroup,
              { marginRight: 10 },
              {
                backgroundColor:
                  item.name == formData?.type?.name ? Colors.PRIMARY : "white",
              },
            ]}
            onPress={() => onHandleInputChanges("type", item)}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color: item.name == formData?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Dose Input */}

      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="eyedrop-outline"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dose Ex. 2, 5ml"
          onChangeText={(value) => onHandleInputChanges("dose", value)}
        />
      </View>

      {/* when to take dropdown */}
      <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="time-outline" size={24} />
        <Picker
          selectedValue={formData?.when}
          onValueChange={(itemValue, itemIndex) =>
            onHandleInputChanges("when", itemValue)
          }
          style={{
            width: "90%",
          }}
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* start and end date */}
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.textInput}>
            {formatDateForText(formData?.startDate) ?? "Start Date"}
          </Text>
        </TouchableOpacity>
        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChanges(
                "startDate",
                FormatDate(event.nativeEvent.timestamp)
              );
              setShowStartDate(false);
            }}
            value={new Date(formData?.startDate) ?? new Date()}
          />
        )}
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}
        >
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.textInput}>
            {formatDateForText(formData?.endDate) ?? "End Date"}
          </Text>
        </TouchableOpacity>

        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChanges(
                "endDate",
                FormatDate(event.nativeEvent.timestamp)
              );
              setShowEndDate(false);
            }}
            value={new Date(formData?.endDate) ?? new Date()}
          />
        )}
      </View>
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons
            style={styles.icon}
            name="timer-outline"
            size={24}
            color="black"
          />
          <Text style={styles.textInput}>
            {formData?.reminder ?? "Select Reminder Time"}
          </Text>
        </TouchableOpacity>
      </View>
      {showTimePicker && (
        <RNDateTimePicker
          mode="time"
          onChange={(event) => {
            onHandleInputChanges(
              "reminder",
              formatTime(event.nativeEvent.timestamp)
            );
            setShowTimePicker(false);
          }}
          value={formData?.reminder ?? new Date()}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={SaveMedication}>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text style={styles.buttonText}>Add New Medication</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: Colors.GRAY,
  },
  typeText: {
    fontSize: 16,
    padding: 5,
    flex: 1,
    marginLeft: 10,
  },
  dateInputGroup: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: "100%",
    marginTop: 25,
  },
  buttonText: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },
});
