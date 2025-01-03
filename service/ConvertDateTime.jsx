import moment from "moment";
export const FormatDate = (timeStamp) => {
  return new Date(timeStamp);
};

export const formatDateForText = (date) => {
  return moment(date).format("L");
};

export const formatTime = (timeStamp) => {
  const date = new Date(timeStamp);
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeString;
};
