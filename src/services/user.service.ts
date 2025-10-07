import { getLogger } from "@logtape/logtape";

import type { CreateUserDto } from "@/types/user";

import { db } from "@/db/client";
import { usersTable } from "@/db/schemes/users";

const logger = getLogger(["hono"]);

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
