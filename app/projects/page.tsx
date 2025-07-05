import Image from "next/image"
import Link from "next/link"
import { projects } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatCurrency } from "@/lib/utils"

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const progress = (project.raised / project.budget) * 100
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
      <Image
        src={project.images[0] || "/placeholder.svg"}
        alt={project.name}
        width={600}
        height={400}
        className="w-full h-56 object-cover"
      />
      <div className="flex flex-col flex-grow">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.location}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <p className="text-sm text-gray-600 mb-4 flex-grow">{project.description}</p>
          <Progress value={progress} className="mb-2" />
          <div className="flex justify-between text-sm mb-4">
            <span className="font-semibold text-green-700">{formatCurrency(project.raised)}</span>
            <span className="text-gray-500">of {formatCurrency(project.budget)}</span>
          </div>
          <Button asChild className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white">
            <Link href={`/projects/${project.slug}`}>Learn More & Donate</Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Our Projects</h1>
        <p className="mt-2 text-lg text-gray-600">
          Each project is a chance to earn immense reward. See where you can help.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {/* You can add a card for future projects here */}
        <Card className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed">
          <CardHeader>
            <CardTitle>More Projects Coming Soon</CardTitle>
            <CardDescription>
              We are actively identifying new communities in need. Your general donations help us start new projects
              faster.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-gray-600 hover:bg-gray-700 text-white">General Donation</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
