import { Items } from "../tables/items.ts";
import { Item, ItemRow } from "../interfaces/item.ts";

export const updateItemStatus = async (
  client: any,
  item_message_ts: string,
  status: string,
) => {
  const itemsStorage = Items.api(client);
  console.log(`Getting item for: ${item_message_ts}`);
  const response = await client.call("apps.hosted.tables.getRow", {
    table: "items",
    id: item_message_ts,
  });
  console.log(response);

  if (response.row != null) {
    const item: Item = JSON.parse(response.row.json);
    item.status = status;

    const itemRow: ItemRow = {
      note_message_ts: item.note_message_ts,
      item_message_ts: item.item_message_ts,
      type: item.type,
      who: item.who,
      where: item.where,
      when: item.when,
      status: status,
      json: JSON.stringify(item),
    };

    const putResponse = await itemsStorage.put(itemRow);
    console.log(putResponse);
  }
};

export const getItemsForChannel = async (
  client: any,
  itemsChannelId: string,
  type: string,
): Promise<Item[]> => {
  const itemsStorage = Items.api(client);
  //console.log(`Getting items for: ${itemsChannelId}`);
  const response = await itemsStorage.query({
    expression: "#where = :channel_id",
    expression_columns: { "#where": "where" },
    expression_values: { ":channel_id": itemsChannelId },
  });
  //console.log(response);

  return convertItemRowsToItems(response.rows);
};

export const saveItemsForNote = async (
  client: any,
  items: Item[],
) => {
  const itemsStorage = Items.api(client);

  if (items != null && items.length > 0) {
    for (let x = 0; x < items.length; x++) {
      const itemRow: ItemRow = {
        note_message_ts: items[x].note_message_ts,
        item_message_ts: items[x].item_message_ts,
        type: items[x].type,
        who: items[x].who,
        where: items[x].where,
        when: items[x].when,
        status: items[x].status,
        json: JSON.stringify(items[x]),
      };

      const putResponse = await itemsStorage.put(itemRow);
      //console.log(putResponse);
    }
  }
};

export const deleteItemsForNote = async (
  client: any,
  noteMessageTs: string,
): Promise<Item[]> => {
  const itemsStorage = Items.api(client);
  //console.log(`Getting items for: ${noteMessageTs}`);
  const queryResponse = await itemsStorage.query({
    expression: "#note_message_ts = :message_ts",
    expression_columns: { "#note_message_ts": "note_message_ts" },
    expression_values: { ":message_ts": noteMessageTs },
  });
  //console.log(queryResponse);

  //console.log(`Deleting any items for: ${noteMessageTs}`);
  if (queryResponse.rows != null && queryResponse.rows.length > 0) {
    for (let x = 0; x < queryResponse.rows.length; x++) {
      /*console.log(
        `Deleting message with ts: ${queryResponse.rows[x].item_message_ts}`,
      );*/
      /*const deleteResponse = await itemsStorage.delete(
        queryResponse.rows[x].item_message_ts,
      );*/
      const deleteResponse = await client.call("apps.hosted.tables.deleteRow", {
        table: "items",
        id: queryResponse.rows[x].item_message_ts,
      });
      //console.log(deleteResponse);
    }
  }

  return convertItemRowsToItems(queryResponse.rows);
};

const convertItemRowsToItems = (itemRows: ItemRow[]): Item[] => {
  const items: Item[] = [];
  if (itemRows != null && itemRows.length > 0) {
    for (let x = 0; x < itemRows.length; x++) {
      // Parse the item from the JSON storage
      items.push(JSON.parse(itemRows[x].json));
    }
  }
  //console.log(items);
  return items;
};
