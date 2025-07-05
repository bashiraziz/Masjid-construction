import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { projects, getTotalBudget, getTotalRaised } from "@/lib/data"
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
    raised: number
  }
}

function StatsDashboard() {
  const totalRaised = getTotalRaised()
  const totalBudget = getTotalBudget()
  const balanceRemaining = totalBudget - totalRaised

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Overall Progress</CardTitle>
        <CardDescription>Our collective goal for all projects.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Raised</p>
            <p className="text-2xl font-bold text-green-700">{formatCurrency(totalRaised)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Needed</p>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalBudget)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Remaining</p>
            <p className="text-2xl font-bold text-orange-600">{formatCurrency(balanceRemaining)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectCard({ project }: ProjectCardProps) {
  const progress = (project.raised / project.goal) * 100
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
            <span>Raised: {formatCurrency(project.raised)}</span>
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

export default function HomePage() {
  const totalBudget = getTotalBudget()
  const totalDonated = getTotalRaised()

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Support Our Mosque Projects
        </h1>
        <figure className="mt-6 max-w-3xl mx-auto">
          <blockquote className="text-lg italic text-gray-700">
            <p>“Whoever builds a mosque for Allah, Allah will build for him a house in Paradise.”</p>
          </blockquote>
          <figcaption className="mt-2 text-sm text-gray-500">
            — Prophet Muhammad ﷺ (Sahih al-Bukhari, Sahih Muslim)
          </figcaption>
        </figure>
        <div className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 space-y-4">
          <p>
            Building a mosque is a lasting deed for Allah. Your contribution creates a space for prayer, knowledge, and
            community, paving a path to Paradise.
          </p>
          <p>It's a legacy, a Sadaqah Jariyah that will continue to benefit you in this life and the next.</p>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/donations">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Donate Now
            </Button>
          </Link>
          <Link href="/projects">
            <Button size="lg" variant="outline">
              View Projects
            </Button>
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <CardTitle className="text-4xl font-bold text-green-600">{formatCurrency(totalDonated)}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Total Donations Received</CardDescription>
          </Card>
          <Card className="text-center p-6">
            <CardTitle className="text-4xl font-bold text-blue-600">{formatCurrency(totalBudget)}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Total Project Goals</CardDescription>
          </Card>
          <Card className="text-center p-6">
            <CardTitle className="text-4xl font-bold text-purple-600">{projects.length}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Active Projects</CardDescription>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/projects">
            <Button variant="outline" size="lg">
              View All Projects
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
