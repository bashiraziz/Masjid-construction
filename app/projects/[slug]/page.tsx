import { notFound } from "next/navigation"
import Image from "next/image"
import { projects, UGX_EXCHANGE_RATE } from "@/lib/data" // Ensure UGX_EXCHANGE_RATE is imported
import { formatCurrency, formatCurrencyUGX } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import { ExternalLink } from "lucide-react"

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  const progress = (project.raised / project.goal) * 100
  const totalBudgetUSD = project.budgetPhases?.reduce((sum, phase) => sum + phase.usdAmount, 0) || 0

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-lg text-gray-500 mt-1">{project.location}</p>

            <Tabs defaultValue="about" className="mt-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="budget">Budget</TabsTrigger>
                <TabsTrigger value="accounting">Accounting</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Project</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none text-gray-700">
                    <p>{project.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Photo & Video Updates</CardTitle>
                    <CardDescription>Visual progress of the construction.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Pictures</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.images.map((src, index) => (
                        <a href={src} target="_blank" rel="noopener noreferrer" key={index}>
                          <Image
                            src={src || "/placeholder.svg"}
                            alt={`${project.name} - Image ${index + 1}`}
                            width={400}
                            height={300}
                            className="rounded-lg object-cover aspect-video transition-transform hover:scale-105"
                          />
                        </a>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Videos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.videos.map((src, index) => (
                        <iframe
                          key={index}
                          className="w-full aspect-video rounded-lg"
                          src={src}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="budget" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Breakdown</CardTitle>
                    <CardDescription>
                      Exchange Rate: 1 USD = {UGX_EXCHANGE_RATE.toLocaleString()} UGX (approx.)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Phase</TableHead>
                          <TableHead className="text-right">Budget (USD)</TableHead>
                          <TableHead className="text-right">Budget (UGX)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {project.budgetPhases?.map((phase, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{phase.name}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(phase.usdAmount)}</TableCell>
                            <TableCell className="text-right font-mono">
                              {formatCurrencyUGX(phase.usdAmount * UGX_EXCHANGE_RATE)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow className="bg-gray-50">
                          <TableHead>Total</TableHead>
                          <TableHead className="text-right font-bold font-mono">
                            {formatCurrency(totalBudgetUSD)}
                          </TableHead>
                          <TableHead className="text-right font-bold font-mono">
                            {formatCurrencyUGX(totalBudgetUSD * UGX_EXCHANGE_RATE)}
                          </TableHead>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accounting" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Accounting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="text-center">Receipt</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {project.accounting &&
                          project.accounting.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.date}</TableCell>
                              <TableCell>{item.description}</TableCell>
                              <TableCell className="text-right font-mono">{formatCurrency(item.amount)}</TableCell>
                              <TableCell className="text-center">
                                <Button variant="outline" size="sm" asChild>
                                  <a href={item.receiptUrl} target="_blank" rel="noopener noreferrer">
                                    View <ExternalLink className="ml-2 h-3 w-3" />
                                  </a>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    {(!project.accounting || project.accounting.length === 0) && (
                      <p className="text-center text-gray-500 py-4">No accounting records yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Funding Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Raised</span>
                    <span className="font-bold text-green-700">{formatCurrency(project.raised)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Goal</span>
                    <span className="font-bold text-gray-800">{formatCurrency(project.goal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Remaining</span>
                    <span className="font-bold text-orange-600">{formatCurrency(project.goal - project.raised)}</span>
                  </div>
                </div>
                <Button size="lg" className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white">
                  Donate to this Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
