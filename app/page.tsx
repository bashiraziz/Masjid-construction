import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getTotalRaised, getTotalBudget, projects } from "@/lib/data"
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

export default function HomePage() {
  const totalRaised = getTotalRaised()
  const totalBudget = getTotalBudget()
  const overallProgress = (totalRaised / totalBudget) * 100

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-700 to-green-900 text-white">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Build a Mosque. Build Your Home in Jannah.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed">
                “Whoever builds a mosque for Allah, Allah will build for him a house in Paradise.”
                <br />— Prophet Muhammad ﷺ (Sahih al-Bukhari, Sahih Muslim)
              </p>
              <p className="text-md md:text-lg leading-relaxed">
                There are few deeds as lasting and beloved as building a mosque for the sake of Allah. Every brick you
                help place becomes a means of prayer, knowledge, community. And a path to Paradise. Your contribution
                isn’t just a donation, it’s a legacy. A Sadaqah Jariyah that will continue to benefit you in this life
                and the next.
              </p>
              <Button size="lg" className="mt-6 bg-white text-green-800 hover:bg-gray-100">
                Donate Now
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Overall Progress</h2>
            <Card className="max-w-2xl mx-auto p-6 shadow-lg">
              <CardContent className="space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Raised:</span>
                  <span className="text-green-700">{formatCurrency(totalRaised)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Needed:</span>
                  <span className="text-gray-800">{formatCurrency(totalBudget)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Balance Remaining:</span>
                  <span className="text-orange-600">{formatCurrency(totalBudget - totalRaised)}</span>
                </div>
                <Progress value={overallProgress} className="w-full mt-4" />
                <p className="text-center text-sm text-gray-500 mt-2">
                  {overallProgress.toFixed(1)}% of the overall goal achieved.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-10">Our Projects</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
