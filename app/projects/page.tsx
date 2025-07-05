import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatCurrency } from "@/lib/utils"
import { projects } from "@/lib/data"
import Image from "next/image"

interface ProjectCardProps {
  project: {
    id: number
    name: string
    slug: string
    description: string
    goal: number
    raised: number
    image?: string // Optional image property
    images?: string[] // Optional array of images
  }
}

function ProjectCard({ project }: ProjectCardProps) {
  const progress = (project.raised / project.goal) * 100
  const imageUrl =
    project.images && project.images.length > 0
      ? project.images[0]
      : project.image || "/placeholder.svg?height=200&width=300" // Fallback placeholder

  return (
    <Card className="flex flex-col h-full">
      <Link href={`/projects/${project.slug}`} className="block">
        <CardHeader className="p-0">
          <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={`Image for ${project.name}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-1 flex flex-col">
          <CardTitle className="text-xl font-bold mb-2">{project.name}</CardTitle>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{project.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Raised: {formatCurrency(project.raised)}</span>
              <span>Goal: {formatCurrency(project.goal)}</span>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-gray-500 dark:text-gray-400">{progress.toFixed(1)}% of goal</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

export default function ProjectsPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Our Projects</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore the various initiatives you can support.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  )
}
