import type { QueryResolvers } from "../../types/generatedGraphQLTypes";
import { Event } from "../../models/Event";

export const getRecurringEventInstances: QueryResolvers["getRecurringEventInstances"] =
  async (_parent, args) => {
    console.log("getRecurringEventInstances", args);
    const event = await Event.findOne({
      _id: args.id,
    }).lean();
    if (!event) {
        throw new Error("Event not found");
        }
    console.log("event", event);
    const recurringEventInstances = await Event.find(
      //
      {
        recurrenceRuleId: event.recurrenceRuleId,
        // startDate: { $gte: event.startDate },
        isRecurringEventException: false,
      },
      null,
    );
    console.log(recurringEventInstances, "recurringEventInstances");
    return recurringEventInstances;
  };
