import { DefineTable, Schema } from "slack-cloud-sdk/mod.ts";

export const Notes = DefineTable("notes", {
  primary_key: "note_message_ts",
  columns: {
    note_channel_id: {
      type: Schema.types.string,
    },
    note_message_ts: {
      type: Schema.types.string,
    },
    note: {
      type: Schema.types.string,
    },
  },
});
