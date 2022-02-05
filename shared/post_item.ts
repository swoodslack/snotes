export const PostItem = async (
  client: any,
  env: any,
  thread_ts: string,
  items_channel_id: string,
  id: string,
  type: string,
  summary: string,
  assignees: string,
  references: string,
  dates: number,
  content: string,
  is_important: boolean,
  is_urgent: boolean,
) => {
  await client.call("chat.postMessage", {
    thread_ts: thread_ts,
    channel: items_channel_id,
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "You have a new *" + type + "*:\n" + summary,
        },
        "accessory": {
          "type": "image",
          "image_url":
            "https://api.slack.com/img/blocks/bkb_template_images/notifications.png",
          "alt_text": "calendar thumbnail",
        },
      },
      {
        "type": "divider",
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*Assignees:*\n" + assignees,
          },
          {
            "type": "mrkdwn",
            "text": "*Referenced people:*\n" + references,
          },
          {
            "type": "mrkdwn",
            "text": "*Important:*\n" + is_important,
          },
          {
            "type": "mrkdwn",
            "text": "*Urgent:*\n" + is_urgent,
          },
          {
            "type": "mrkdwn",
            "text": "*Referenced dates:*\n" + dates,
          },
        ],
      },
      {
        "type": "divider",
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Content:*\n" + content,
        },
      },
    ],
    metadata: {
      event_type: "item_created",
      event_payload: {
        id: id,
        type: type,
        summary: summary,
        assignees: assignees,
        references: references,
        dates: dates,
        content: content,
        is_important: is_important,
        is_urgent: is_urgent,
      },
    },
  });
};
