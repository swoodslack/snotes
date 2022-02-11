import { Item } from "../interfaces/item.ts";
import { datetime } from "https://deno.land/x/ptera/mod.ts";

export const createAgendaBlocks = (items: Item[]) => {
  let blocks: any = [];

  // Add the agenda header
  blocks.push({
    "type": "header",
    "text": {
      "type": "plain_text",
      "text": `:railway_car: Agenda for ${datetime().format("MMMM dd, YYYY")}`,
      "emoji": true,
    },
  });
  blocks.push({
    "type": "divider",
  });

  if (items != null && items.length > 0) {
    for (let x = 0; x < items.length; x++) {
      blocks = blocks.concat(
        createBlocksForItem(items[x], "", false, true, false, false, ""),
      );
    }
  }

  blocks.push({
    "type": "divider",
  });

  console.log(blocks);
  return blocks;
};

/**
 * Creates the message Block Kit given some properties are dynamic based on the item being processed.
 * @param item The item to build the Block Kit message
 * @returns The blocks property for message requests
 */
export const createBlocksForItem = (
  item: Item,
  noteUserId: string,
  addTypeInfo: boolean,
  addWho: boolean,
  addWhere: boolean,
  addFooter: boolean,
  noteMessageLink: string,
) => {
  // Construct the message blocks
  const blocks = [];
  const fields = [];

  if (addTypeInfo) {
    blocks.push({
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": ":car: Task",
        "emoji": true,
      },
    });
    blocks.push({
      "type": "divider",
    });
  }

  blocks.push({
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": item.summary,
    },
  });
  /*blocks.push({
    "type": "divider",
  });*/

  if (addWho && item.who) {
    fields.push({
      "type": "mrkdwn",
      "text": `*Who:*\n<@${item.who}>`,
    });
  }

  if (addWhere && item.where) {
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

  if (fields.length > 0) {
    blocks.push({
      "type": "section",
      "fields": fields,
    });
  }

  if (addFooter) {
    blocks.push({
      "type": "divider",
    });
    blocks.push({
      "type": "context",
      "elements": [
        {
          "type": "mrkdwn",
          "text":
            `Use :eyes: when 'in progress' and :white_check_mark: when 'completed'.\nThis item was created by <@${noteUserId}> from a note in <#${item.note_channel_id}>.\nThe original message is <${noteMessageLink}|here>.`,
        },
      ],
    });
  }

  //console.log(blocks);
  return blocks;
};
