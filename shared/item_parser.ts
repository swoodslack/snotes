import { Item, Reference } from "../interfaces/item.ts";
import { datetime } from "https://deno.land/x/ptera/mod.ts";

export const parseItem = (
  note_channel_id: string,
  note_message_ts: string,
  item: string,
): Item => {
  let when = 0;
  let isUrgent = false;
  let isImportant = false;

  // Get the who and where if we have them
  // These are chained together as the method changes the item content
  const whoReference: Reference = getStartingReference(item, "@");
  const whereReference: Reference = getStartingReference(item, "#");

  // Now process the item for other fields
  const checkItem = item.toLowerCase();

  // Check for when
  const dates = checkItem.match(/\d{2}([\/.-])\d{2}\1\d{4}/g);
  if (dates != null && dates.length > 0) {
    for (let y = 0; y < dates.length; y++) {
      when = datetime(dates[y]).toMilliseconds();
    }
  }

  // Check for urgency
  if (checkItem.indexOf("urgent") > 0 || checkItem.indexOf("urgency") > 0) {
    isUrgent = true;
  }

  // Check for importance
  if (
    checkItem.indexOf("important") > 0 ||
    checkItem.indexOf("importance") > 0
  ) {
    isImportant = true;
  }

  return {
    note_channel_id: note_channel_id,
    note_message_ts: note_message_ts,
    type: "task",
    summary: item,
    who: whoReference.reference,
    where: whereReference.reference,
    when: when,
    /*isImportant: isImportant,
    isUrgent: isUrgent,*/
  };
};

function getStartingReference(
  item: string,
  symbol: string,
): Reference {
  const reference: Reference = {};

  // Trim the item to make sure we're processing correctly
  item = item.trim();
  console.log(`Checking item for reference (symbol: ${symbol}): ${item}`);

  // Check to see if there's a reference at the beginning
  if (item.startsWith(`<${symbol}`)) {
    // We use this to assign the who
    reference.reference = item.substring(
      item.indexOf(`<${symbol}`) + 2,
      item.indexOf(">"),
    );

    // Patch for channel identifiers as they're compound
    if (reference.reference.indexOf("|") > 0) {
      reference.reference = reference.reference.substring(
        0,
        reference.reference.indexOf("|"),
      );
    }
    console.log(`Reference found for ${symbol}: ${reference}`);
  }

  return reference;
}
