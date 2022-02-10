import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { CreateAgendaWorkflow } from "../workflows/create_agenda.ts";

export const CreateAgendaShortcut = DefineTrigger("create_agenda_shortcut", {
  type: TriggerTypes.Shortcut,
  name: "Create Agenda",
  description: "Generates the list of outstanding items for the channel",
})
  .runs(CreateAgendaWorkflow)
  .withInputs((ctx) => ({
    items_channel_id: ctx.data.channel_id,
  }));
