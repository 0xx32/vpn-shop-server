import { getLogger } from "@logtape/logtape";
import { eq } from "drizzle-orm";

import type { CreateUserDto } from "@/types/user";

import { db } from "@/db/client";
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
