import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { projects } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const progress = (project.raised / project.goal) * 100
  const imageUrl =
    project.images && project.images.length > 0 ? project.images[0] : "/placeholder.svg?height=400&width=600"

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={project.name}
        width={600}
        height={400}
        className="w-full h-56 object-cover"
      />
      <div className="flex flex-col flex-grow">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.location}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <p className="text-sm text-gray-600 mb-4 flex-grow">{project.description}</p>
          <Progress value={progress} className="mb-2" />
          <div className="flex justify-between text-sm mb-4">
            <span className="font-semibold text-green-700">{formatCurrency(project.raised)}</span>
            <span className="text-gray-500">of {formatCurrency(project.goal)}</span>
          </div>
          <Button asChild className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white">
            <Link href={`/projects/${project.slug}`}>Learn More & Donate</Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}

export default function ProjectsPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Mosque Projects</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  )
}
