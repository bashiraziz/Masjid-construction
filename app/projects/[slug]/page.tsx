import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getProjectBySlug, getTotalDonated } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import { AddDonationForm } from "@/app/donations/add-donation-form"

export const dynamic = "force-dynamic"

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-6">The project you are looking for does not exist.</p>
        <Link href="/projects">
          <Button>Back to Projects</Button>
        </Link>
      </div>
    )
  }

  const totalDonated = getTotalDonated(project.id)
  const progress = (totalDonated / project.goal) * 100
  const remaining = project.goal - totalDonated
  const imageUrl =
    project.images && project.images.length > 0 ? project.images[0] : "/placeholder.svg?height=400&width=600"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/projects" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Projects
        </Link>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={`Image for ${project.name}`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-3xl font-bold mb-2">{project.name}</CardTitle>
          <CardDescription className="text-gray-600 mb-4">{project.location}</CardDescription>
          <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Donation Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Raised:</span>
                  <span className="font-bold text-green-700">{formatCurrency(totalDonated)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Goal:</span>
                  <span className="font-bold text-gray-800">{formatCurrency(project.goal)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Remaining:</span>
                  <span className="font-bold text-orange-600">{formatCurrency(remaining)}</span>
                </div>
                <Progress value={progress} className="w-full mt-2" />
                <p className="text-center text-sm text-gray-500 mt-1">{progress.toFixed(1)}% of the goal achieved.</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Donate to this Project</h3>
              <AddDonationForm projectId={project.id} />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">About the Project</h3>
            <p className="text-gray-700 leading-relaxed">
              This section would contain more detailed information about the project, its phases, impact, and any
              specific needs. You can expand on this content to provide a comprehensive overview for potential donors.
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
              <li>Phase 1: Land acquisition and initial planning.</li>
              <li>Phase 2: Foundation and main structure construction.</li>
              <li>Phase 3: Interior finishing and facilities.</li>
              <li>Estimated completion: 24 months from funding.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
