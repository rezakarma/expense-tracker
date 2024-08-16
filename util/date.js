export const GetFormattedDate = (date) => {
  return date.toISOString().slice(0, 10);
};

export const GetDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
