import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { CreateAgendaFunction } from "../functions/create_agenda.ts";

export const CreateAgendaWorkflow = DefineWorkflow(
  "create_agenda_workflow",
  {
    title: "Create Agenda",
    description: "Generates the list of outstanding items for the channel",
    input_parameters: {
      required: ["items_channel_id"],
      properties: {
        items_channel_id: {
          type: Schema.slack.types.channel_id,
          description:
            "The channel to generate the agenda from and post the agenda to.",
        },
      },
    },
  },
);

CreateAgendaWorkflow.addStep(CreateAgendaFunction, {
  items_channel_id: CreateAgendaWorkflow.inputs.items_channel_id,
});
