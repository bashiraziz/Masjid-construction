import Image from "next/image"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { projects, getProjectBySlug, getTotalDonated } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

// Define UGX_EXCHANGE_RATE here or ensure it's exported from lib/data
const UGX_EXCHANGE_RATE = 3750 // Example rate, adjust as needed

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const totalDonated = getTotalDonated(project.id)
  const progress = (totalDonated / project.goal) * 100
  const remaining = project.goal - totalDonated

  const imageUrl =
    project.images && project.images.length > 0 ? project.images[0] : "/placeholder.svg?height=400&width=600"

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="p-0">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={`Image for ${project.name}`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=400&width=600"
              }}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">{project.name}</CardTitle>
              <CardDescription className="text-lg text-gray-700 dark:text-gray-300">
                {project.description}
              </CardDescription>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
              <Link href="/donations">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Funding Progress</h3>
              <div className="flex justify-between text-sm font-medium">
                <span>Raised: {formatCurrency(totalDonated)}</span>
                <span>Goal: {formatCurrency(project.goal)}</span>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatCurrency(remaining)} remaining to reach goal.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Details</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Category:</strong> {project.category}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Location:</strong> {project.location}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Estimated Cost (UGX):</strong> {formatCurrency(project.goal * UGX_EXCHANGE_RATE, "UGX")}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Project Overview</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {project.longDescription || "No detailed overview available for this project."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-6 border-t flex justify-end">
          <Link href="/projects">
            <Button variant="outline">Back to Projects</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
