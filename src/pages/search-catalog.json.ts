import { getCollection } from "astro:content";
import { categoryInfo, projectUrl } from "../data/site";

export async function GET() {
  const projects = (await getCollection("projects")).sort(
    (a, b) => a.data.order - b.data.order,
  );
  return new Response(
    JSON.stringify(
      projects.map((project) => ({
        url: projectUrl(project.id),
        title: project.data.title,
        summary: project.data.summary,
        category: categoryInfo(project.data.category).title,
        technologies: [...project.data.languages, ...project.data.technologies],
      })),
    ),
    { headers: { "Content-Type": "application/json; charset=utf-8" } },
  );
}
