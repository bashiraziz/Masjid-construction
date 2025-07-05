import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { projects, getTotalDonated } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"

interface ProjectCardProps {
  project: {
    id: number
    name: string
    description: string
    goal: number
    images?: string[] // Make images optional
    slug: string
  }
}

function ProjectCard({ project }: ProjectCardProps) {
  const totalDonated = getTotalDonated(project.id)
  const progress = (totalDonated / project.goal) * 100
  const imageUrl =
    project.images && project.images.length > 0 ? project.images[0] : "/placeholder.svg?height=200&width=300"

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={`Image for ${project.name}`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=200&width=300"
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="text-xl font-bold mb-2">{project.name}</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </CardDescription>
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Raised: {formatCurrency(totalDonated)}</span>
            <span>Goal: {formatCurrency(project.goal)}</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/projects/${project.slug}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">Our Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
