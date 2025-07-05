import { getDonations } from "./actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrencyUSD } from "@/lib/utils"
import Link from "next/link"
import { projects } from "@/lib/data" // Still needed to link project names

export default async function DonationsPage() {
  const donations = await getDonations()

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Recent Donations</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Donations</CardTitle>
        </CardHeader>
        <CardContent>
          {donations.length === 0 ? (
            <p className="text-center text-gray-500">No donations received yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Project</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((donation) => {
                    const project = projects.find((p) => p.id === donation.projectId)
                    return (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium">{donation.donorName}</TableCell>
                        <TableCell>{formatCurrencyUSD(donation.amount)}</TableCell>
                        <TableCell>{donation.date}</TableCell>
                        <TableCell>
                          {project ? (
                            <Link href={`/projects/${project.slug}`} className="text-blue-600 hover:underline">
                              {project.name}
                            </Link>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
