export const getWeekDay = (day) => {
  const adjusted = (day + 1) % 7;

  if (adjusted === 0) return "Sun";
  if (adjusted === 1) return "Mon";
  if (adjusted === 2) return "Tue";
  if (adjusted === 3) return "Wed";
  if (adjusted === 4) return "Thu";
  if (adjusted === 5) return "Fri";
  return "Sat";
};