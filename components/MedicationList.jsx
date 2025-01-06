import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GetDateRangeToDisplay } from "../service/ConvertDateTime";
import Colors from "../constant/Colors";
import moment from "moment";
import { getLocalStorage } from "@/service/Storage";
import { collection,  getDocs, query, where } from "firebase/firestore";
import  MedicationCardItem  from "../components/MedicationCardItem";
import EmptyState from "../components/EmptyState"
import {db} from '../config/FireBaseConfig'

export default function MedicationList() {
  const [medList, setMedList] = useState();
  const [dateRange, setDateRange] = useState();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("MOUNT");
    GetDateRangeList();
    GetMedicationList(selectedDate);
  }, []);
  const GetDateRangeList = () => {
    const dateRange = GetDateRangeToDisplay();
    if (!dateRange || !Array.isArray(dateRange)) {
      console.error("Invalid dateRange:", dateRange);
      return;
    }
    setDateRange(dateRange);
  };;
  const GetMedicationList = async (selectedDate) => {
   
    const user = await getLocalStorage("userDetail");
    if (!user || !user.email) {
      console.error("User is undefined or missing email.");
      return;
    }
    setMedList([]);
    setLoading(true);
    console.log("USERDATE", user);
    try {
      console.log("USERDATE-2", selectedDate);
      const q = query(
        collection(db, "medication"),
        where("userEmail", "==", user?.email),
        where("dates", "array-contains", selectedDate)
      );
      console.log("USERDATE-3", q);
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => doc.data());
      // querySnapshot.forEach((doc) => {
      //   console.log("docId:" + doc.Id + "==>", doc.data());
      //   setMedList((prev) => [...prev, doc.data()]);
      // });
      setMedList(docs);
      console.log("Fetched medList:", docs);
      console.log("MEDLIST", medList);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Image
        source={require("../assets/images/medication.jpeg")}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 15,
        }}
      />

      <FlatList
        data={dateRange}
        horizontal
        style={{ marginTop: 15 }}
        showHorizontalScrollIndicator={false}
        renderItem={({ item, index }) =>item ? (
          <TouchableOpacity
            style={[
              styles.dateGroup,
              {
                backgroundColor:
                  item.formatedDate == selectedDate
                    ? Colors.PRIMARY
                    : Colors.LIGHT_GRAY_BORDER,
              },
            ]}
            onPress={() => {
              setSelectedDate(item.formatedDate);
              GetMedicationList(item.formatedDate);
            }}
          >
            {" "}
            {/* {console.log("formatedDate=",item)}
             */}
            <Text
              style={[
                styles.day,
                {
                  color: item.formatedDate == selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.date,
                {
                  color: item.formatedDate == selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        ) :null }
      />
      {console.log("MEDLIST-2", medList)}
      {medList?.length > 0 ? (
        <FlatList
          data={medList}
          onRefresh={() => GetMedicationList(selectedDate)}
          refreshing={loading}
          renderItem={({ item }) =>item? <MedicationCardItem medicine={item} />:null}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateGroup: {
    padding: 10,
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 10,
  },
  day: {
    fontSize: 18,
  },
  date: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
