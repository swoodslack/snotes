export const getLinkToMessage = async (
  client: any,
  channelId: string,
  messageTs: string,
): Promise<string> => {
  //console.log(`Getting permalink for: ${channelId} / ${messageTs}`);
  const result = await client.call("chat.getPermalink", {
    channel: channelId,
    message_ts: messageTs,
  });
  //console.log(result);
  return result.permalink;
};

export const callWebhook = async (
  webhookUrl: string,
  body: any,
) => {
  console.log(`Calling webhook: ${webhookUrl}`);
  const response = await fetch(
    webhookUrl,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );
  console.log(response);
};
