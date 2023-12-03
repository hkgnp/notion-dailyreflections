import { Client } from "@notionhq/client";
import dayjs from "dayjs";

export const createNotionPage = async (
  creighton: { url: string; reflections: string },
  gospel: { reading: string; url: string; passage: string },
): Promise<void> => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const response = await notion.pages.create({
    parent: {
      database_id: process.env.DATABASE_ID as string,
    },
    properties: {
      "Gospel Reading": {
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: gospel.reading,
            },
          },
        ],
      },
      Date: {
        type: "date",
        date: {
          start: dayjs(new Date()).format("YYYY-MM-DD"),
        },
      },
      Creighton: {
        type: "url",
        url: creighton.url,
      },
      USCCB: {
        type: "url",
        url: gospel.url,
      },
    },
    children: [
      {
        object: "block",
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Gospel Reading",
              },
            },
          ],
        },
      },
      {
        object: "block",
        paragraph: {
          rich_text: [
            {
              text: {
                content: gospel.passage,
              },
            },
          ],
        },
      },
      {
        object: "block",
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Creighton Reflections",
              },
            },
          ],
        },
      },
      {
        object: "block",
        paragraph: {
          rich_text: [
            {
              text: {
                content: creighton.reflections,
              },
            },
          ],
        },
      },
      {
        object: "block",
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Personal Reflections",
              },
            },
          ],
        },
      },
      {
        object: "block",
        paragraph: {
          rich_text: [
            {
              text: {
                content: "What is the most storyworthy moment yesterday?",
              },
            },
          ],
        },
      },
      {
        object: "block",
        bulleted_list_item: {
          rich_text: [
            {
              text: {
                content: "",
              },
            },
          ],
        },
      },
      {
        object: "block",
        paragraph: {
          rich_text: [
            {
              text: {
                content: "What should I strive to do better?",
              },
            },
          ],
        },
      },
      {
        object: "block",
        bulleted_list_item: {
          rich_text: [
            {
              text: {
                content: "",
              },
            },
          ],
        },
      },
    ],
  });

  console.log("Got response:", response);
};
