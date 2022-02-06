import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { PostItemWorkflow } from "../workflows/post_item.ts";

export const PostItemShortcut = DefineTrigger("post_item", {
  type: TriggerTypes.Shortcut,
  name: "Post Item",
  description: "Posts an item message with metadata",
})
  .runs(PostItemWorkflow)
  .withInputs((ctx) => ({
    note_channel_id: ctx.data.channel_id,
    note_message_ts: {
      value: "",
      hidden: true,
    },
    type: "task",
  }));
