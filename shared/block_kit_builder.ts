import { Item } from "../interfaces/item.ts";

/**
 * Creates the message Block Kit given some properties are dynamic based on the item being processed.
 * @param item The item to build the Block Kit message
 * @returns The blocks property for message requests
 */
export const createBlocksForItem = (item: Item, addDivider: boolean) => {
  // Construct the message blocks
  const blocks = [];
  const fields = [];

  blocks.push({
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*" + item.type + "*:\n" + item.summary,
    },
    "accessory": {
      "type": "image",
      "image_url":
        `https://raw.githubusercontent.com/swoodslack/snotes/master/assets/${item.type}.png`,
      "alt_text": `${item.type} image`,
    },
  });
  /*blocks.push({
    "type": "divider",
  });*/

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

  /*fields.push({
    "type": "mrkdwn",
    "text": `*Important:*\n:${item.isImportant ? "heart" : "handshake"}:`,
  });
  fields.push({
    "type": "mrkdwn",
    "text": `*Urgent:*\n:${item.isUrgent ? "fox_face" : "turtle"}:`,
  });*/

  blocks.push({
    "type": "section",
    "fields": fields,
  });

  /*if (item.content) {
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
  }*/

  if (addDivider) {
    blocks.push({
      "type": "divider",
    });
  }

  //console.log(blocks);
  return blocks;
};
