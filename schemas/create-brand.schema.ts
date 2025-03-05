import { z } from "zod";

export const createBranchSchema = z.object({
  name: z.string().min(3).max(255),
  headline: z.string().min(3).max(255),
  link: z.string().url(),
  pixel: z.coerce.number().positive(),
  rows: z.coerce.number().positive().nullish(),
  columns: z.coerce.number().positive().nullish(),
  type: z.enum(["regular", "special"]),
  template: z.object({
    headerEmoji: z.string().nonempty().nullish(),
    headerTitle: z.string().nonempty(),
  }),
  logo: z
    .any()
    .transform((fileList) => fileList?.[0])
    .refine((file) => Boolean(file), "Invalid file")
    .refine(
      (file) => file?.type?.startsWith?.("image/"),
      "File must be an image"
    ),
});

export type CreateBranchSchema = z.infer<typeof createBranchSchema>;
