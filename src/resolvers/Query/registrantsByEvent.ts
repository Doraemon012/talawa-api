import type { QueryResolvers } from "../../types/generatedGraphQLTypes";
import { Event, User } from "../../models";
import { getSort } from "./helperFunctions/getSort";
import mongoose from "mongoose";

/**
 * This query will fetch all the events for which user registered from the database.
 * @param _parent-
 * @param args - An object that contains `id` of the user and `orderBy`.
 * @returns An object that contains the Event data.
 * @remarks The query function uses `getSort()` function to sort the data in specified.
 */
export const registrantsByEvent: QueryResolvers["registrantsByEvent"] =
  async (_parent, args) => {
    const eventId = new mongoose.Types.ObjectId(args.id); // Convert string to ObjectId

    return await User.find({ 'registeredEvents': eventId });
  };
