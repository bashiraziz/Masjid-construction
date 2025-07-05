import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatCurrency } from "@/lib/utils"
import { projects, getTotalRaised } from "@/lib/data" // Import getTotalRaised
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

export default function HomePage() {
  const totalRaised = getTotalRaised() // Use the local getTotalRaised from lib/data

  return (
    <main className="flex-1 p-4 md:p-6">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-600 to-teal-700 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            Support Our Mosque Projects
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Your generous contributions help us build and maintain essential facilities for our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-green-700 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
              href="/donations"
            >
              Donate Now
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              href="/projects"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thanks to your support, we&apos;re making a difference.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <CardHeader>
              <CardTitle className="text-5xl font-bold text-green-600">{formatCurrency(totalRaised)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300">Total Donations Raised</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardHeader>
              <CardTitle className="text-5xl font-bold text-green-600">5+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300">Projects Completed</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardHeader>
              <CardTitle className="text-5xl font-bold text-green-600">100%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300">Transparency</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Current Projects</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our ongoing initiatives and contribute to their success.
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
