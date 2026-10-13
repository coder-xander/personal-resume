import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum([
      "system",
      "device",
      "connectivity",
      "cloud",
      "client",
      "factory",
      "ai",
      "opensource",
    ]),
    order: z.number(),
    role: z.string(),
    languages: z.array(z.string().min(1)).min(1),
    technologies: z.array(z.string()),
    pipeline: z.array(z.string()),
    featured: z.boolean().default(false),
    context: z.string().default("Ropedia 项目实践"),
    repository: z.url().optional(),
  }),
});
export const collections = { projects };
