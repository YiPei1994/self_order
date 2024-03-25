import { z } from "zod";

export const menuSchema = z.object({
  name: z.string(),
  type: z.string(),
  allergies: z.array(z.number()),
  price: z.number(),
  image: z.string(),
  ingredients: z.string(),
});

export type MenuSchemaType = z.infer<typeof menuSchema>;
