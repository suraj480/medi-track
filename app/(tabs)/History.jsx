import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import Colors from "../../constant/Colors";
import { GetPrevDateRangeToDisplay } from "../../service/ConvertDateTime";
import moment from "moment";
import { getLocalStorage } from "@/service/Storage";
import { db } from "../../config/FireBaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import MedicationCardItem from "../../components/MedicationCardItem";
import EmptyState from "../../components/EmptyState";
import { router } from "expo-router";
export default function History() {
  const [medList, setMedList] = useState();
  const [dateRange, setDateRange] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
  useEffect(() => {
    GetDateList();
  }, []);
  const GetDateList = () => {
    const dates = GetPrevDateRangeToDisplay();
    setDateRange(dates);
  };

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
      querySnapshot.forEach((doc) => {
        console.log("docId:" + doc.Id + "==>", doc.data());
        setMedList((prev) => [...prev, doc.data()]);
      });
      setMedList(docs);
      console.log("Fetched medList:", docs);
      console.log("MEDLIST", medList);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={[]}
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
      ListHeaderComponent={
        <View style={styles.mainContainer}>
          <Image
            source={require("../../assets/images/med-history.png")}
            style={styles.imageBanner}
          />
          <Text style={styles.header}>Medication History</Text>

          <FlatList
            data={dateRange}
            horizontal
            style={{ marginTop: 15 }}
            showHorizontalScrollIndicator={false}
            renderItem={({ item, index }) =>
              item ? (
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
                        color:
                          item.formatedDate == selectedDate ? "white" : "black",
                      },
                    ]}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      styles.date,
                      {
                        color:
                          item.formatedDate == selectedDate ? "white" : "black",
                      },
                    ]}
                  >
                    {item.date}
                  </Text>
                </TouchableOpacity>
              ) : null
            }
          />

          {console.log("MEDLIST-2", medList)}
          {medList?.length > 0 ? (
            <FlatList
              data={medList}
              onRefresh={() => GetMedicationList(selectedDate)}
              refreshing={loading}
              renderItem={({ item }) =>
                item ? (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/MedicationActionModal",
                        params: {
                          ...item,
                          selectedDate: selectedDate,
                        },
                      })
                    }
                  >
                    <MedicationCardItem
                      medicine={item}
                      selectedDate={selectedDate}
                    />
                  </TouchableOpacity>
                ) : null
              }
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <EmptyState />
          )}

          <Text
            style={{
              fontSize: 25,
              padding: 30,
              fontWeight: "bold",
              color: Colors.GRAY,
              textAlign: "center",
            }}
          >
            No Medication Found
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: "white",
  },
  dateGroup: {
    padding: 15,
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 10,
  },
  day: {
    fontSize: 20,
  },
  date: {
    fontSize: 26,
    fontWeight: "bold",
  },

  imageBanner: {
    borderRadius: 15,
    width: "100%",
    height: 200,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },
});
