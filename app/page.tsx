import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getTotalRaised, getTotalBudget, projects } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

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

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const progress = (project.raised / project.goal) * 100
  const imageUrl =
    project.images && project.images.length > 0 ? project.images[0] : "/placeholder.svg?height=400&width=600"

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={project.name}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        <Progress value={progress} className="mb-2" />
        <div className="flex justify-between text-sm">
          <span className="font-semibold text-green-700">{formatCurrency(project.raised)}</span>
          <span className="text-gray-500">of {formatCurrency(project.goal)}</span>
        </div>
        <Button asChild className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
          <Link href={`/projects/${project.slug}`}>View Project</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const totalRaised = getTotalRaised()
  const totalBudget = getTotalBudget()
  const overallProgress = totalBudget > 0 ? (totalRaised / totalBudget) * 100 : 0

  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Build a Mosque. Build Your Home in Jannah.
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
              Building a mosque is a lasting deed for Allah. Your contribution creates a space for prayer, knowledge,
              and community, paving a path to Paradise.
            </p>
            <p>It's a legacy, a Sadaqah Jariyah that will continue to benefit you in this life and the next.</p>
          </div>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/projects">Explore Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <StatsDashboard />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Current Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
