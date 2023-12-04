import { Client } from "@notionhq/client";

export const appendList = async (
  notion: Client,
  parentId: string,
  text: string,
): Promise<void> => {
  await notion.blocks.children.append({
    block_id: parentId,
    children: [
      {
        object: "block",
        bulleted_list_item: {
          rich_text: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    ],
  });
};
