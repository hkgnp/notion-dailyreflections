import axios from "axios";
import { convert } from "html-to-text";
import { creightonGospelDate } from "./get-date";
import { sleep } from "./sleep";

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

  let passage;
  if (reading.includes(",")) {
    const author = reading.substring(0, 2);
    const chapter = reading.substring(2, reading.indexOf(":"));
    const readingArr = reading.substring(reading.indexOf(":") + 1).split(",");

    const passageArr = [];
    for (const r of readingArr) {
      const reading = await axios.get(
        `https://api.esv.org/v3/passage/text/?q=${author} ${chapter}:${r}`,
        {
          headers: {
            Authorization: `Token ${process.env.GOSPEL_API}`,
          },
        },
      );
      passageArr.push(reading.data.passages[0]);
      sleep(2000);
    }
    passage = passageArr.join(" ");
  } else {
    const passageResponse = await axios.get(
      `https://api.esv.org/v3/passage/text/?q=${reading}`,
      {
        headers: {
          Authorization: `Token ${process.env.GOSPEL_API}`,
        },
      },
    );
    passage = passageResponse.data.passages[0];
  }

  return {
    url,
    reading,
    passage,
  };
};
