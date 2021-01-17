export const getPrettyGroupingDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const currentMonth = currentTime.getMonth();
  const currentDay = currentTime.getDay();

  let groupingDate = '';

  if (currentYear === year && month === currentMonth) {
    if (day === currentDay) {
      groupingDate = `Today`;
    } else if (currentDay - day === 1) {
      groupingDate = `Yesterday`;
    } else {
      groupingDate = `${year}${month}${day}`;
    }
  } else {
    groupingDate = `${year}${month}${day}`;
  }

  return groupingDate;
};
