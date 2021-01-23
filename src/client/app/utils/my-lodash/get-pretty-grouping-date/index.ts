const addZeroIfNecessary = (number: number) =>
  String(number).length > 1 ? `${number}` : `0${number}`;

export const getPrettyGroupingDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const currentMonth = currentTime.getMonth();
  const currentDay = currentTime.getDate();

  if (currentYear === year && month === currentMonth) {
    if (day === currentDay) {
      return `Today`;
    } else if (currentDay - day === 1) {
      return `Yesterday`;
    }
  }

  return `${addZeroIfNecessary(day)}.${addZeroIfNecessary(month + 1)}.${year}`;
};
