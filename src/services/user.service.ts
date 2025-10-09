import { getLogger } from "@logtape/logtape";
import { and, eq } from "drizzle-orm";

import type { CreateUserDto } from "@/types/user";

import { db } from "@/db/client";
import { subscriptionsTable } from "@/db/schemes/subscriptions";
import { usersTable } from "@/db/schemes/users";

const logger = getLogger(["hono"]);

export const getUserByID = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    return result.at(0);
  } catch (error) {
    logger.error("Error getting user by ID");
    console.error(error);
  }
};
export const getUserByUniqueID = async (uniqueID: string) => {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.uniqueID, uniqueID))
      .limit(1);

    return result.at(0);
  } catch (error) {
    logger.error("Error getting user by ID");
    console.error(error);
  }
};

export const getUserByTelegramID = async (telegramID: number) => {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.telegramID, telegramID))
      .limit(1);

    return result.at(0);
  } catch (error) {
    logger.error("Error getting user by telegramID");
    console.error(error);
  }
};

export const getAllUsers = async () => {
  try {
    return db.select().from(usersTable);
  } catch (error) {
    logger.error("Error getting users");
    console.error(error);
  }
};

export const createUser = async (dto: CreateUserDto) => {
  try {
    const user = await db
      .insert(usersTable)
      .values({
        uniqueID: crypto.randomUUID(),
        telegramID: dto.telegramID,
      })
      .returning();

    return user.at(0);
  } catch (error) {
    logger.error("Error creating user");
    console.error(error);
  }
};

export const getUserSubscriptions = async (userId: number) => {
  try {
    return db
      .select()
      .from(subscriptionsTable)
      .where(eq(subscriptionsTable.userId, userId));
  } catch (error) {
    logger.error("Error getting user subscriptions");
    console.error(error);
  }
};
export const getUserSubscriptionsById = async (
  userId: number,
  subId: number,
) => {
  try {
    const result = await db
      .select()
      .from(subscriptionsTable)
      .where(
        and(
          eq(subscriptionsTable.userId, userId),
          eq(subscriptionsTable.id, subId),
        ),
      )
      .limit(1);

    return result.at(0);
  } catch (error) {
    logger.error(`Error getting user subscription by ID ${subId}`);
    console.error(error);
  }
};
