interface ProjectPageProps {
  params: {
    name: string;
  };
}

// TODO (mei): Implement this page

export default async function ProjectPage({ params }: ProjectPageProps) {
  return <>{params.name}</>;
}
