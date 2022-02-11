import { Items } from "../tables/items.ts";
import { Item } from "../interfaces/item.ts";

export const getItemsForChannel = async (
  client: any,
  itemsChannelId: string,
  type: string,
): Promise<Item[]> => {
  const itemsStorage = Items.api(client);
  console.log(`Getting items for: ${itemsChannelId}`);
  const response = await itemsStorage.query({
    expression: "#where = :channel_id",
    expression_columns: { "#where": "where" },
    expression_values: { ":channel_id": itemsChannelId },
  });
  console.log(response);
  return response.rows;
};

export const saveItemsForNote = async (
  client: any,
  items: Item[],
) => {
  const itemsStorage = Items.api(client);

  if (items != null && items.length > 0) {
    for (let x = 0; x < items.length; x++) {
      const putResponse = await itemsStorage.put(items[x]);
      console.log(putResponse);
    }
  }
};

export const deleteItemsForNote = async (
  client: any,
  noteMessageTs: string,
): Promise<Item[]> => {
  const itemsStorage = Items.api(client);
  console.log(`Getting items for: ${noteMessageTs}`);
  const queryResponse = await itemsStorage.query({
    expression: "#note_message_ts = :message_ts",
    expression_columns: { "#note_message_ts": "note_message_ts" },
    expression_values: { ":message_ts": noteMessageTs },
  });
  console.log(queryResponse);

  console.log(`Deleting any items for: ${noteMessageTs}`);
  if (queryResponse.rows != null && queryResponse.rows.length > 0) {
    for (let x = 0; x < queryResponse.rows.length; x++) {
      console.log(
        `Deleting message with ts: ${queryResponse.rows[x].item_message_ts}`,
      );
      /*const deleteResponse = await itemsStorage.delete(
        queryResponse.rows[x].item_message_ts,
      );*/
      const deleteResponse = await client.call("apps.hosted.tables.deleteRow", {
        table: "items",
        id: queryResponse.rows[x].item_message_ts,
      });
      console.log(deleteResponse);
    }
  }

  return queryResponse.rows;
};
