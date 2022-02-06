/*import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { PostItem } from "../shared/post_item.ts";

export const PostItemFunction = DefineFunction(
  "post_item_function",
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
  async ({ inputs, client, env }) => {
    console.log("Creating item...");
    PostItem(
      client,
      env,
      inputs.items_channel_id,
      inputs.id,
      inputs.type,
      inputs.summary,
      inputs.who ? inputs.who : "",
      inputs.where ? inputs.where : "",
      inputs.when ? inputs.when : 0,
      inputs.content ? inputs.content : "",
      inputs.is_important ? inputs.is_important : false,
      inputs.is_urgent ? inputs.is_urgent : false,
    );

    return await {
      outputs: {},
    };
  },
);
*/
