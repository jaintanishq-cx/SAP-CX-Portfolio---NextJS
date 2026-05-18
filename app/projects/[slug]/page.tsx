export default function ProjectPage({ params }: { params: { slug: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">Project: {params.slug}</h1>
    </main>
  )
}
