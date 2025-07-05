import { notFound } from "next/navigation"
import { projects, UGX_EXCHANGE_RATE } from "@/lib/data" // Ensure UGX_EXCHANGE_RATE is imported
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  const progress = (project.raised / project.goal) * 100
  const remaining = project.goal - project.raised

  // Ensure project.images is an array and has elements, otherwise fallback to project.image or placeholder
  const imageUrl =
    project.images && project.images.length > 0
      ? project.images[0]
      : project.image || "/placeholder.svg?height=400&width=600"

  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={`Image for ${project.name}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Raised: {formatCurrency(project.raised)}</span>
                  <span>Goal: {formatCurrency(project.goal)}</span>
                </div>
                <Progress value={progress} className="w-full" />
                <p className="text-xs text-gray-500 dark:text-gray-400">{progress.toFixed(1)}% of goal reached</p>
              </div>
              <div className="text-lg font-semibold">Remaining: {formatCurrency(remaining)}</div>
              <Link href="/donations" passHref>
                <Button className="w-full py-3 text-lg">Donate to this Project</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-semibold">Category:</span> {project.category}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {project.location}
              </p>
              <p>
                <span className="font-semibold">Start Date:</span> {project.startDate}
              </p>
              <p>
                <span className="font-semibold">End Date:</span> {project.endDate}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {project.status}
              </p>
              <p>
                <span className="font-semibold">Goal (USD equivalent):</span>{" "}
                {formatCurrency(project.goal / UGX_EXCHANGE_RATE, "USD")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                This project aims to {project.impact}. Your donation will directly contribute to {project.impactDetails}
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
