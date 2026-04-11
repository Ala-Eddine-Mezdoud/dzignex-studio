import Landing from "../../../../features/projects/components/Landing"
import About from "../../../../features/projects/project/About"
import Details from "../../../../features/projects/project/Details"
import Latest from "../../../../features/projects/project/Latest"
import ClientFeedback from "../../../../features/projects/project/ClientFeedback"
import { getProjectBySlug, getProjects } from "../../../../db-actions/projects"
import { notFound } from "next/navigation"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // 1. Fetch current project with details and testimonial
  const project = await getProjectBySlug(slug);
  
  if (!project || !project.isPublished) {
    notFound();
  }

  // 2. Fetch latest projects for the bottom section (excluding current)
  const allProjects = await getProjects();
  const moreProjects = allProjects
    .filter(p => p.id !== project.id && p.isPublished)
    .slice(0, 3);

  return (
    <div className="">
        <Landing  />
        <About project={project} />
        <Details details={project.details as any} />
        <ClientFeedback testimonial={project.testimonial as any} />
        <Latest projects={moreProjects as any} />
    </div>
  );
}
