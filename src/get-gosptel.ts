import axios from "axios";
import { convert } from "html-to-text";
import { creightonGospelDate } from "./get-date";

// Get Gospel in a string
export const getGospel = async (): Promise<{
  url: string;
  reading: string;
  passage: string;
}> => {
  const url = `https://bible.usccb.org/bible/readings/${creightonGospelDate(
    new Date(),
  )}.cfm`;
  const bibleResponse = await axios.get(url);
  const text = convert(bibleResponse.data, {
    baseElements: {
      selectors: ["div.page-container"],
    },
    wordwrap: false,
  });
  const regex = /GOSPEL\n\n(.*?)\[/g.exec(text);
  if (!regex || !regex[1]) return { url: "", reading: "", passage: "" };
  const reading = regex[1].trim();
  const passageResponse = await axios.get(
    `https://api.esv.org/v3/passage/text/?q=${reading}`,
    {
      headers: {
        Authorization: `Token ${process.env.GOSPEL_API}`,
      },
    },
  );
  return {
    url,
    reading,
    passage: passageResponse.data.passages[0],
  };
};
