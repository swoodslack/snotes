import { Item } from "../interfaces/item.ts";
import { datetime } from "https://deno.land/x/ptera/mod.ts";

export const createAgendaBlocks = (items: Item[]) => {
  let blocks: any = [];

  // Filter out the items by status
  const unassignedItems = items.filter((item) => (!item.status));
  const progressItems = items.filter((item) =>
    item.status === REACTJI_IN_PROGRESS
  );
  //const notItems = items.filter((item) => item.status === REACTJI_NOT_DOING);
  //const doneItems = items.filter((item) => item.status === REACTJI_DONE);

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

  // Create the sections for each item status
  blocks = createAgendaSection(
    unassignedItems,
    "Unassigned Items",
    REACTJI_UNASSIGNED,
    blocks,
  );
  blocks = createAgendaSection(
    progressItems,
    "In Progress Items",
    REACTJI_IN_PROGRESS,
    blocks,
  );
  //blocks = createAgendaSection(doneItems, "Done Items", blocks);
  //blocks = createAgendaSection(notItems, "Not Doing Items", blocks);

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
  addItemPermalink: boolean,
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

  if (fields.length > 0) {
    blocks.push({
      "type": "section",
      "fields": fields,
    });
  }

  if (addItemPermalink) {
    blocks.push({
      "type": "context",
      "elements": [
        {
          "type": "mrkdwn",
          "text": `Update the item <${item.permalink}|here> with any changes.`,
        },
      ],
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
            `:${REACTJI_IN_PROGRESS}: = 'in progress', :${REACTJI_DONE}: = 'done', :${REACTJI_NOT_DOING}: = 'not doing'.\nThis item was created by <@${noteUserId}> from a note in <#${item.note_channel_id}>.\nThe original message is <${noteMessageLink}|here>.`,
        },
      ],
    });
  }

  //console.log(blocks);
  return blocks;
};

export const REACTJI_UNASSIGNED = "broken_heart";
export const REACTJI_IN_PROGRESS = "eyes";
export const REACTJI_DONE = "white_check_mark";
export const REACTJI_NOT_DOING = "thumbsdown";

const createAgendaSection = (
  items: Item[],
  sectionTitle: string,
  reactji: string,
  blocks: any,
) => {
  if (items != null && items.length > 0) {
    blocks.push({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:${reactji}: *${sectionTitle}*`,
      },
    });

    for (let x = 0; x < items.length; x++) {
      blocks = blocks.concat(
        createBlocksForItem(items[x], "", false, true, false, false, true, ""),
      );
    }
  }
  return blocks;
};
