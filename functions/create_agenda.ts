import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { deleteItems, getItemsForChannel } from "../shared/storage.ts";
import { sendAgenda } from "../shared/messenger.ts";
import {
  REACTJI_DONE,
  REACTJI_NOT_DOING,
} from "../shared/block_kit_builder.ts";
import { Item } from "../interfaces/item.ts";

export const CreateAgendaFunction = DefineFunction(
  "create_agenda_function",
  {
    title: "Create Agenda",
    description: "Generates the list of outstanding items for the channel",
    input_parameters: {
      required: ["items_channel_id"],
      properties: {
        items_channel_id: {
          type: Schema.slack.types.channel_id,
          description: "The channel to post the message.",
        },
      },
    },
  },
  async ({ inputs, client, env }) => {
    // Get the items for the channel
    const items: Item[] = await getItemsForChannel(
      client,
      inputs.items_channel_id,
      "type",
    );

    // Find the items that are done and not doing - we only want to show
    // those once and then delete them from the data store.
    if (items != null) {
      let oneTimeItems: Item[] = [];
      oneTimeItems = oneTimeItems.concat(
        items.filter((item) => item.status === REACTJI_NOT_DOING),
      );
      oneTimeItems = oneTimeItems.concat(
        items.filter((item) => item.status === REACTJI_DONE),
      );
      await deleteItems(client, oneTimeItems);
    }

    // Post the agenda for those items
    await sendAgenda(client, inputs.items_channel_id, items);

    return await {
      outputs: {},
    };
  },
);
