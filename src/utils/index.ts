export function formatDate(date: Date) {
  const newDate =
    "" +
    String(date.getFullYear()) +
    "-" +
    (date.getMonth() < 9
      ? "0" +
        String(date.getMonth() + 1) +
        "-" +
        (date.getDate() < 10
          ? "0" + String(date.getDate())
          : String(date.getDate()))
      : String(date.getMonth() + 1) +
        "-" +
        (date.getDate() < 10
          ? "0" + String(date.getDate())
          : String(date.getDate())));
  return newDate;
}
