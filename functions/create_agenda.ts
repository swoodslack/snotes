import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { getItems } from "../shared/item_manager.ts";

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
    await getItems(client, inputs.items_channel_id);

    return await {
      outputs: {},
    };
  },
);
