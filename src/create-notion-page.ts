import { Client } from "@notionhq/client";
import { createEntry } from "./notion/create-entry";
import { appendHeadings } from "./notion/append-headings";
import { appendContent } from "./notion/append-content";
import { sleep } from "./sleep";

export const createNotionPage = async (
  creighton: { url: string; reflections: string },
  gospel: { reading: string; url: string; passage: string },
): Promise<void> => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  try {
    const parentId = await createEntry(
      notion,
      gospel.reading,
      gospel.url,
      creighton.url,
    );

    // Handle rate limits
    console.log("Writing Gospel Reading");
    await appendHeadings(notion, parentId, "Gospel Reading");
    sleep(2000);
    await appendContent(notion, parentId, gospel.passage);
    sleep(2000);
    console.log("Writing Creighton Reflections");
    await appendHeadings(notion, parentId, "Creighton Reflections");
    sleep(2000);
    await appendContent(notion, parentId, creighton.reflections);
  } catch (error) {
    console.error(error);
  }
};
