import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants";
import type { InterfaceAppUserProfile, InterfaceUser } from "../models";
import { User } from "../models";

export interface InterfaceJwtTokenPayload {
  tokenVersion: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}
export const createAccessToken = (
  user: InterfaceUser,
  appUserProfile: InterfaceAppUserProfile,
): string => {
  return jwt.sign(
    {
      tokenVersion: appUserProfile?.tokenVersion ?? 0,
      userId: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "40m",
    },
  );
};

export const createRefreshToken = (
  user: InterfaceUser,
  appUserProfile: InterfaceAppUserProfile,
): string => {
  return jwt.sign(
    {
      tokenVersion: appUserProfile?.tokenVersion ?? 0,
      userId: user?._id.toString(),
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    },
    REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "30d",
    },
  );
};

export const revokeRefreshToken = async (userId: string): Promise<void> => {
  const user = await User.findOne({ _id: userId }).lean();

  if (user) {
    const filter = { _id: userId };
    const update = { $unset: { token: "" } };
    await User.findOneAndUpdate(filter, update);
  }
};
