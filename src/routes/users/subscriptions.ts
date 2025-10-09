import { Hono } from "hono";
import { validator } from "hono-openapi";

import type { UserSelect } from "@/db/schemes/users";

import { remnawaveClient } from "@/lib/remnawave";
import { setUserUniqueIdMiddleware } from "@/middleware/setUserByUniqueIdMiddleware";
import { createSubscription } from "@/services/subscription.service";
import {
  getUserSubscriptions,
  getUserSubscriptionsById,
} from "@/services/user.service";
import {
  createUserSubscriptionDtoSchema,
  getUserSubscriptionByIdSchema,
} from "@/utils/constants/user";

interface Variables {
  user: UserSelect;
}

const subscriptions = new Hono<{ Variables: Variables }>();

subscriptions.get(
  "/:userUniqueID/subscriptions",
  setUserUniqueIdMiddleware,
  async (c) => {
    const user = c.get("user");

    const userSubscriptions = await getUserSubscriptions(user.id);

    return c.json(userSubscriptions, 200);
  },
);
subscriptions.get(
  "/:userUniqueID/subscriptions/:id",
  setUserUniqueIdMiddleware,
  validator("param", getUserSubscriptionByIdSchema),
  async (c) => {
    const user = c.get("user");
    const params = c.req.valid("param");

    const userSubscriptions = await getUserSubscriptionsById(
      user.id,
      +params.id,
    );

    if (!userSubscriptions) {
      return c.json(
        { error: `User subscription with id ${params.id} not found` },
        404,
      );
    }

    return c.json(userSubscriptions, 200);
  },
);

subscriptions.post(
  "/:userUniqueID/subscriptions",
  setUserUniqueIdMiddleware,
  validator("json", createUserSubscriptionDtoSchema),
  async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");

    try {
      const remnawaveUser = await remnawaveClient.users.create({
        status: "ACTIVE",
        username: `user_${user.telegramID}_${new Date().getTime()}`,
        expireAt: new Date(body.expireAt),
        telegramId: user.telegramID,
        activeInternalSquads: body.activeInternalSquads,
      });

      const newSubscription = await createSubscription({
        userId: user.id,
        status: "ACTIVE",
        isTrial: false,
        startDate: new Date(),
        endDate: new Date(remnawaveUser.expireAt),
        subUrl: remnawaveUser.subscriptionUrl,
        remnawaveUuid: remnawaveUser.uuid,
        remnawaveShortId: remnawaveUser.shortUuid,
        internalSquadsIds: body.activeInternalSquads,
      });

      if (!newSubscription) {
        return c.json({ error: "Error creating subscription" }, 400);
      }

      return c.json(newSubscription, 201);
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ error: error.message }, 400);
      }
    }
  },
);

export { subscriptions as subscriptionRoutes };
