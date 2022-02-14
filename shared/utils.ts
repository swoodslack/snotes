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

export const callGoogleCalendar = async (
  apiKey: string,
  calendarId: string,
) => {
  let timeMax = "2022-02-13T00:00:00-00:00";
  let timeMin = "2022-02-15T00:00:00-00:00";
  console.log(`Calling Google Calendar API for: ${calendarId}`);
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/?key=${apiKey}&timeMax=${timeMax}&timeMin=${timeMin}`,
  );
  console.log(response);
};
