export default function showDate(providedDate?: string, hideTime?: boolean) {
  if (!providedDate) return;
  const date = new Date(providedDate);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = monthNames[date.getMonth()];
  const today = `${date.getDate()} ${monthName} ${date.getFullYear()}`;

  return `${today} ${
    hideTime
      ? ""
      : ", " +
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
  }`;
}
