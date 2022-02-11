import { Item } from "../interfaces/item.ts";
import {
  createAgendaBlocks,
  createBlocksForItem,
} from "./block_kit_builder.ts";

/**
 * Handles the message send for agenda requests for a specific channel.
 * @param client The client ot use to send the agenda message
 * @param itemsChannelId The channel to send the agenda message
 * @param items The list of items to include in the agenda message
 */
export const sendAgenda = async (
  client: any,
  itemsChannelId: string,
  items: Item[],
) => {
  if (items != null && items.length > 0) {
    const result = await client.call("chat.postMessage", {
      channel: itemsChannelId,
      blocks: createAgendaBlocks(items),
      /*metadata: {
        event_type: "snotes_items:agenda",
        event_payload: items,
      },*/
    });
    console.log(result);
  }
};

/**
 * Handles the deletion of messages that were previously sent from a note conversion to actions.
 * @param client The client to use to delete the item messages
 * @param items The list of items to delete the messages for
 */
export const clearSentItems = async (
  client: any,
  items: Item[],
) => {
  if (items != null && items.length > 0) {
    for (let x = 0; x < items.length; x++) {
      // Delete the message from Slack
      console.log(
        `Deleting message for: ${items[x].item_channel_id} / ${
          items[x].item_message_ts
        }`,
      );
      const result = await client.call("chat.delete", {
        channel: items[x].item_channel_id,
        ts: items[x].item_message_ts,
      });
      console.log(result);
    }
  }
};

/**
 * Handles the message sends of multiple items.
 * @param client The client to use to send the item messages
 * @param items The items being messaged
 * @param noteUserId The identifier for the note the items related to
 * @returns The list of messaged items
 */
export const sendItems = async (
  client: any,
  items: Item[],
  noteUserId: string,
): Promise<Item[]> => {
  const messagedItems: Item[] = [];
  if (items != null && items.length > 0) {
    for (let x = 0; x < items.length; x++) {
      //console.log(`Dispatching item: ${JSON.stringify(items[x])}`);
      messagedItems.push(await sendItem(client, items[x], noteUserId));
    }
  }
  return messagedItems;
};

/**
 * Handles the message send of a single item.
 * @param client The client to use to send the item message
 * @param item The item being messaged
 */
const sendItem = async (
  client: any,
  item: Item,
  noteUserId: string,
): Promise<Item> => {
  // If the channel to post is the same as the note, put the items in thread
  const channel: string = determineMessageChannel(item);
  let thread_ts = "";
  if (channel === item.note_channel_id) {
    thread_ts = item.note_message_ts;
  }

  // Send the message for the item
  //console.log(`Posting item message: ${JSON.stringify(item)}`);
  const result = await client.call("chat.postMessage", {
    thread_ts: thread_ts,
    channel: determineMessageChannel(item),
    blocks: createBlocksForItem(
      item,
      noteUserId,
      true,
      true,
      false,
      true,
    ),
    metadata: {
      event_type: "snotes_item:created",
      event_payload: item,
    },
  });
  //console.log(result);

  // Assign the fields needed for storage
  item.item_channel_id = result.channel;
  item.item_message_ts = result.ts;

  return item;
};

/**
 * Figures out where the item message needs to be sent.
 * @param item The item being dispatched
 * @returns The channel to dispatch the item message
 */
const determineMessageChannel = (item: Item): string => {
  // If we have the where, send the item to the channel
  if (item.where) {
    //console.log(`Dispatching message to where: ${item.where}`);
    return item.where;
  }

  // If we have the who, send the item to the person
  // GAP: You can't DM a user unfortunately
  /*if (item.who) {
    console.log(`Dispatching message to where: ${item.who}`);
    return item.who;
  }*/

  // If we have neither the who nor the where, post to the note channel
  //console.log(`Dispatching message to note channel: ${item.note_channel_id}`);
  return item.note_channel_id;
};
