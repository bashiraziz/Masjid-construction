import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { getDonations } from "./actions"
import { AddDonationForm } from "./add-donation-form"
import { projects } from "@/lib/data" // Import projects to get project names
import Link from "next/link" // Import Link for project links

export const dynamic = "force-dynamic" // Ensure this page is dynamically rendered

export default async function DonationsPage() {
  const donations = await getDonations()

  // Create a map for quick project name lookup
  const projectMap = new Map(projects.map((p) => [p.id, p.name]))

  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Donations Received</h1>

        <AddDonationForm />

        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            {donations.length === 0 ? (
              <p className="text-center text-gray-500">No donations received yet.</p>
            ) : (
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
                    const project = projects.find((p) => p.id === donation.project_id)
                    return (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium">{donation.donor_name}</TableCell>
                        <TableCell>{formatCurrency(donation.amount)}</TableCell>
                        <TableCell>{new Date(donation.donation_date).toLocaleDateString()}</TableCell>
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
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
