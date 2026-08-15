import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string().or(z.date()).transform((val: string | Date) => new Date(val)),
    featuredImage: z.string().optional(),
    author: z.string().default('TacoPDF Team'),
    tags: z.array(z.string()).default([]),
    translationKey: z.string().optional(),
    standalone: z.boolean().default(true),
  }),
});

export const collections = {
  'blog': blogCollection,
};
