import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { getItemsForUser } from "../shared/storage.ts";
import { sendReview } from "../shared/messenger.ts";
import { Item } from "../interfaces/item.ts";

export const CalendarEventFunction = DefineFunction(
  "calendar_event_function",
  {
    title: "Notify about Calendar Event",
    description: "Used to notify when there's an upcoming calendar event",
    input_parameters: {
      required: ["attendees", "summary", "event_link"],
      properties: {
        summary: {
          type: Schema.types.string,
          description: "The event summary",
        },
        event_link: {
          type: Schema.types.string,
          description: "The event link",
        },
        attendees: {
          type: Schema.types.string,
          description: "The attendees",
        },
      },
    },
  },
  async ({ inputs, client, env }) => {
    //console.log(`Getting channel members for: ${CHANNEL_ID}`);
    const membersResult = await client.call("conversations.members", {
      channel: CHANNEL_ID,
    });
    //console.log(membersResult);

    // Get the member user ids out so we can find out who the "me" is
    const membersList: string[] = membersResult.members as Array<string>;

    // Get the attendees from the list
    let attendeesList = inputs.attendees.split(",");

    // If the members list is greater than 2, this is not an individual note channel
    if (membersList.length <= 2) {
      // We're dealing with an app channel for individual notes - one user will be 'me'
      // and the other will be the bot
      //console.log(`Getting me information for user id: ${membersList[0]}`);
      const meResult1 = await client.call("users.info", {
        user: membersList[0],
      });
      //console.log(meResult1);

      //console.log(`Getting me information for user id: ${membersList[1]}`);
      const meResult2 = await client.call("users.info", {
        user: membersList[0],
      });
      //console.log(meResult2);

      // Get the users
      const user1: any = meResult1.user;
      const user2: any = meResult2.user;
      let meEmail = "";

      // Get the me user
      if (user1 && user1.is_bot) {
        meEmail = user2.profile.email;
      } else {
        meEmail = user1.profile.email;
      }
      //console.log(`Me email is: ${meEmail}`);

      // Filter me out of the attendees
      attendeesList = attendeesList.filter((attendee) =>
        attendee.toLowerCase() !== meEmail.toLowerCase()
      );

      const attendeeIds: string[] = [];

      // If we have more than 10 attendees we don't pull an agenda based on users
      if (attendeesList.length <= 10) {
        for (let x = 0; x < attendeesList.length; x++) {
          //console.log(`Getting user for email: ${attendeesList[x]}`);
          const userResult = await client.call("users.lookupByEmail", {
            email: attendeesList[x],
          });
          //console.log(userResult);

          // Check to make sure we found the "me" user
          if (userResult.user) {
            const user: any = userResult.user;
            attendeeIds.push(user.id);
          } else {
            console.log(`A user could not be found for: ${attendeesList[x]}`);
          }
        }
        /*console.log(
          `The attendee identifiers are: ${JSON.stringify(attendeeIds)}`,
        );*/

        if (attendeeIds.length > 0) {
          const attendeeItems: Item[] = await getItemsForUser(
            client,
            attendeeIds[0],
            "task",
          );

          // Post the agenda for those items
          await sendReview(
            client,
            CHANNEL_ID,
            attendeeItems,
            inputs.summary,
            inputs.event_link,
          );
        }
      } else {
        console.log("Attendee list is too long to generate an agenda");
      }
    } else {
      console.log(
        `The channel has multiple members: ${JSON.stringify(membersList)}`,
      );
    }

    return await {
      outputs: {},
    };
  },
);

const CHANNEL_ID = "C032UTA7JUS";
