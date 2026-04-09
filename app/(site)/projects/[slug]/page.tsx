import Landing from "../../../../features/projects/components/Landing"
import About from "../../../../features/projects/project/About"
import Details from "../../../../features/projects/project/Details"
import Latest from "../../../../features/projects/project/Latest"
import ClientFeedback from "../../../../features/projects/project/ClientFeedback"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="">
        <Landing />
        <About />
        <Details />
        <ClientFeedback />
        <Latest />
    </div>
  );
}
