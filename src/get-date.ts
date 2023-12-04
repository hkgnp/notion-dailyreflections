import dayjs from "dayjs";

export const creightonGospelDate = (date: Date) => {
  const modDate = dayjs(date).format("MMDDYY");
  console.log(`The date being retrieved is ${modDate}`);
  return modDate;
};
