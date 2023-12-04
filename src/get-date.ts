import dayjs from "dayjs";

export const creightonGospelDate = (date: Date) => {
  console.log(`The date today is ${date}`);
  return dayjs(date).format("MMDDYY");
};
