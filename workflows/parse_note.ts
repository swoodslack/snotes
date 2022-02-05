import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { ParseNoteFunction } from "../functions/parse_note.ts";

export const ParseNoteWorkflow = DefineWorkflow(
  "parse_note_workflow",
  {
    title: "Parse Note",
    description: "Takes the provided note and parses it to items of work",
    input_parameters: {
      required: ["channel_id", "note"],
      properties: {
        channel_id: {
          type: Schema.slack.types.channel_id,
          description: "The channel to post items to",
        },
        message_id: {
          type: Schema.types.string,
          description: "The message id for the note",
        },
        title: {
          type: Schema.types.string,
          description: "The title for the note",
        },
        tags: {
          type: Schema.types.array,
          items: {
            type: Schema.slack.types.channel_id,
          },
          description: "Channels to tag for this note",
        },
        note: {
          type: Schema.types.string,
          description: "The note to parse",
        },
      },
    },
  },
);

ParseNoteWorkflow.addStep(ParseNoteFunction, {
  channel_id: ParseNoteWorkflow.inputs.channel_id,
  message_id: ParseNoteWorkflow.inputs.message_id,
  title: ParseNoteWorkflow.inputs.title,
  tags: ParseNoteWorkflow.inputs.tags,
  note: ParseNoteWorkflow.inputs.note,
});
