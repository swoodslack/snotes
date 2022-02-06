import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { PostItemFunction } from "../functions/post_item.ts";

export const PostItemWorkflow = DefineWorkflow(
  "post_item_workflow",
  {
    title: "Post Item",
    description: "Posts an item message with metadata",
    input_parameters: {
      required: ["items_channel_id", "id", "type", "summary"],
      properties: {
        items_channel_id: {
          type: Schema.slack.types.channel_id,
          description: "The channel to post the message.",
        },
        id: {
          type: Schema.types.string,
          description: "The id of the item being posted",
        },
        type: {
          type: Schema.types.string,
          description: "The item type (task, decision, insight)",
          enum: ["task", "insight", "decision"],
          choices: [
            {
              "title": "Task",
              "value": "task",
            },
            {
              "title": "Insight",
              "value": "insight",
            },
            {
              "title": "Decision",
              "value": "decision",
            },
          ],
        },
        summary: {
          type: Schema.types.string,
          description: "The item summary",
        },
        who: {
          type: Schema.slack.types.user_id,
          description: "Who the item is for",
        },
        where: {
          type: Schema.slack.types.channel_id,
          description: "Where the item should be routed",
        },
        when: {
          type: Schema.slack.types.timestamp,
          description: "When the item needs attention",
        },
        content: {
          type: Schema.types.string,
          description: "The item content",
        },
        is_important: {
          type: Schema.types.boolean,
          description: "Is the item important",
        },
        is_urgent: {
          type: Schema.types.boolean,
          description: "Is the item urgent",
        },
      },
    },
  },
);

PostItemWorkflow.addStep(PostItemFunction, {
  items_channel_id: PostItemWorkflow.inputs.items_channel_id,
  id: PostItemWorkflow.inputs.id,
  type: PostItemWorkflow.inputs.type,
  summary: PostItemWorkflow.inputs.summary,
  who: PostItemWorkflow.inputs.who,
  where: PostItemWorkflow.inputs.where,
  when: PostItemWorkflow.inputs.when,
  content: PostItemWorkflow.inputs.content,
  is_important: PostItemWorkflow.inputs.is_important,
  is_urgent: PostItemWorkflow.inputs.is_urgent,
});
