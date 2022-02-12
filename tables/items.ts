import { DefineTable, Schema } from "slack-cloud-sdk/mod.ts";

export const Items = DefineTable("items", {
  primary_key: "item_message_ts",
  columns: {
    note_message_ts: {
      type: Schema.types.string,
    },
    item_message_ts: {
      type: Schema.types.string,
    },
    type: {
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
    status: {
      type: Schema.types.string,
    },
    json: {
      type: Schema.types.string,
    },
  },
});
