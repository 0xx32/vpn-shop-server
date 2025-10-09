import z from "zod";

export const createUserDtoSchema = z.object({
  telegramID: z.number(),
});
