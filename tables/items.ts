import { DefineTable, Schema } from "slack-cloud-sdk/mod.ts";

export const Items = DefineTable("items", {
  primary_key: "item_message_ts",
  columns: {
    note_channel_id: {
      type: Schema.types.string,
    },
    note_message_ts: {
      type: Schema.types.string,
    },
    item_channel_id: {
      type: Schema.types.string,
    },
    item_message_ts: {
      type: Schema.types.string,
    },
    type: {
      type: Schema.types.string,
    },
    summary: {
      type: Schema.types.string,
    },
    who: {
      type: Schema.slack.types.user_id,
    },
    where: {
      type: Schema.slack.types.channel_id,
    },
    when: {
      type: Schema.types.number,
    },
    content: {
      type: Schema.types.string,
    },
  },
});
