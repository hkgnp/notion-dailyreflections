import { Client } from "@notionhq/client";

export const appendHeadings = async (
  notion: Client,
  parentId: string,
  heading: string,
): Promise<void> => {
  try {
    await notion.blocks.children.append({
      block_id: parentId,
      children: [
        {
          object: "block",
          heading_2: {
            rich_text: [
              {
                text: {
                  content: heading,
                },
              },
            ],
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};
