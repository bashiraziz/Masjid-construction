import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { projects } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

// This is a simplified ProjectCard component for demonstration.
// In a real app, you might move this to its own file (e.g., components/project-card.tsx)
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const progress = (project.raised / project.goal) * 100
  const imageUrl =
    project.images && project.images.length > 0 ? project.images[0] : "/placeholder.svg?height=400&width=600"

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
      <Link href={`/projects/${project.slug}`} className="block">
        <Image
          alt={`Image for ${project.name}`}
          className="h-48 w-full object-cover"
          height={300}
          src={imageUrl || "/placeholder.svg"}
          style={{
            aspectRatio: "400/300",
            objectFit: "cover",
          }}
          width={400}
        />
      </Link>
      <CardHeader className="flex-grow">
        <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
        <p className="text-sm text-gray-500">{project.location}</p>
        <p className="text-gray-600 mt-2 line-clamp-3">{project.description}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-600">Raised:</span>
            <span className="font-bold text-green-700">{formatCurrency(project.raised)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-600">Goal:</span>
            <span className="font-bold text-gray-800">{formatCurrency(project.goal)}</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
        <Button asChild className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white">
          <Link href={`/projects/${project.slug}`}>Learn More & Donate</Link>
        </Button>
      </CardContent>
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
