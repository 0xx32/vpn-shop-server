import z from "zod";

export const createUserDtoSchema = z.object({
  telegramID: z.number(),
});

export const createUserSubscriptionDtoSchema = z.object({
  expireAt: z.string(),
  activeInternalSquads: z.array(z.string()),
});

export const getUserSubscriptionByIdSchema = z.object({
  id: z.string(),
});
