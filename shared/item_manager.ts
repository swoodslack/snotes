import { Items } from "../tables/items.ts";
import { createBlocksForItem } from "./block_kit_builder.ts";

export const getItems = async (client: any, items_channel_id: string) => {
  const items = Items.api(client);
  console.log(`Getting items for: ${items_channel_id}`);
  const response = await items.query({
    expression: "#where = :channel_id",
    expression_columns: { "#where": "where" },
    expression_values: { ":channel_id": items_channel_id },
  });
  console.log(response);

  let blocks: any = [];
  if (response.rows != null && response.rows.length > 0) {
    for (let x = 0; x < response.rows.length; x++) {
      console.log(`Creating blocks for: ${JSON.stringify(response.rows[x])}`);
      blocks = blocks.concat(createBlocksForItem(response.rows[x], true));
    }
  }

  console.log(`Sending message: ${JSON.stringify(blocks)}`);
  const result = await client.call("chat.postMessage", {
    channel: items_channel_id,
    blocks: blocks,
    /*metadata: {
      event_type: "snotes_items:agenda",
      event_payload: response.rows,
    },*/
  });
  console.log(result);
};
