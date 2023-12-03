import axios from "axios";
import { convert } from "html-to-text";
import { creightonGospelDate } from "./get-date";

// Get Creighton in a string
export const getCreighton = async (): Promise<{
  url: string;
  reflections: string;
}> => {
  const url = `https://onlineministries.creighton.edu/CollaborativeMinistry/${creightonGospelDate}.html`;
  const response = await axios.get(url);
  const reflections = convert(response.data, {
    baseElements: { selectors: ["td.Reflection-text"] },
    wordwrap: false,
  });
  return { url, reflections };
};
