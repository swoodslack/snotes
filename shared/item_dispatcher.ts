import { Item } from "../interfaces/item.ts";
import { Items } from "../tables/items.ts";

export const dispatchItems = async (
  client: any,
  env: any,
  items: Item[],
) => {
  if (items != null && items.length > 0) {
    for (let x = 0; x < items.length; x++) {
      console.log(`Dispatching item: ${JSON.stringify(items[x])}`);
      await dispatchItem(client, items[x]);
    }
  }
};

/**
 * Handles the dispatch of a single item. Both sending the message and doing any necessary storage.
 * @param client The client to use to send the item message
 * @param item The item being dispatched
 */
const dispatchItem = async (client: any, item: Item) => {
  // If the channel to post is the same as the note, put the items in thread
  const channel: string = determineDispatchChannel(item);
  let thread_ts = "";
  if (channel === item.note_channel_id) {
    thread_ts = item.note_message_ts;
  }

  // Send the message for the item
  console.log(`Posting item message: ${JSON.stringify(item)}`);
  const result = await client.call("chat.postMessage", {
    thread_ts: thread_ts,
    channel: determineDispatchChannel(item),
    blocks: constructBlocksPayload(item),
    metadata: {
      event_type: "snotes_item:created",
      event_payload: item,
    },
  });
  console.log(result);

  // Assign the fields needed for storage
  item.item_channel_id = result.channel;
  item.item_message_ts = result.ts;

  console.log(`Inserting item into Items table: ${JSON.stringify(item)}`);
  const items = Items.api(client);
  items.put(item);

  /*  items.put({
    note_channel_id: item.note_channel_id,
    note_message_ts: item.note_message_ts,
    item_channel_id: item.item_channel_id ? item.item_channel_id : "",
    item_message_ts: item.item_message_ts ? item.item_message_ts : "",
    type: item.type,
    summary: item.summary,
    who: item.who ? item.who : "",
    where: item.where ? item.where : "",
    when: item.when ? item.when : 0,
    content: item.content ? item.content : "",
    is_urgent: item.isUrgent,
    is_important: item.isImportant,
  });*/
};

/**
 * Figures out where the item message needs to be sent.
 * @param item The item being dispatched
 * @returns The channel to dispatch the item message
 */
const determineDispatchChannel = (item: Item): string => {
  // If we have the where, send the item to the channel
  if (item.where) {
    console.log(`Dispatching message to where: ${item.where}`);
    return item.where;
  }

  // If we have the who, send the item to the person
  // GAP: You can't DM a user unfortunately
  /*if (item.who) {
    console.log(`Dispatching message to where: ${item.who}`);
    return item.who;
  }*/

  // If we have neither the who nor the where, post to the note channel
  console.log(`Dispatching message to note channel: ${item.note_channel_id}`);
  return item.note_channel_id;
};

/**
 * Creates the message Block Kit given some properties are dynamic based on the item being processed.
 * @param item The item to build the Block Kit message
 * @returns The blocks property for message requests
 */
const constructBlocksPayload = (item: Item) => {
  // Construct the message blocks
  const blocks = [];
  const fields = [];

  blocks.push({
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "You have a new *" + item.type + "*:\n" + item.summary,
    },
    "accessory": {
      "type": "image",
      "image_url": "assets/task.png",
      "alt_text": "calendar thumbnail",
    },
  });
  blocks.push({
    "type": "divider",
  });

  if (item.who) {
    fields.push({
      "type": "mrkdwn",
      "text": `*Who:*\n<@${item.who}>`,
    });
  }

  if (item.where) {
    fields.push({
      "type": "mrkdwn",
      "text": `*Where:*\n<#${item.where}>`,
    });
  }

  if (item.when && item.when > 0) {
    fields.push({
      "type": "mrkdwn",
      "text": `*When:*\n${item.when}`,
    });
  }

  fields.push({
    "type": "mrkdwn",
    "text": `*Important:*\n:${item.isImportant ? "heart" : "handshake"}:`,
  });
  fields.push({
    "type": "mrkdwn",
    "text": `*Urgent:*\n:${item.isUrgent ? "fox_face" : "turtle"}:`,
  });

  blocks.push({
    "type": "section",
    "fields": fields,
  });

  if (item.content) {
    blocks.push({
      "type": "divider",
    });
    blocks.push({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Content:*\n" + item.content,
      },
    });
  }

  console.log(blocks);
  return blocks;
};
