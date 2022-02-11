import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { getItemsForChannel } from "../shared/storage.ts";
import { sendAgenda } from "../shared/messenger.ts";
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

    // Post the agenda for those items
    await sendAgenda(client, inputs.items_channel_id, items);

    return await {
      outputs: {},
    };
  },
);
