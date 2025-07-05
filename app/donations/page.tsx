import { projects } from "@/lib/data" // Still need projects for name lookup
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { HandHeart } from "lucide-react"
import { getDonations } from "./actions" // Import the new server action
import type { Donation } from "@/lib/data" // Import type for consistency

export default async function DonationsPage() {
  const donations: Donation[] = await getDonations() // Fetch donations from the database

  const getProjectName = (projectId: number | null) => {
    if (projectId === null) return "General Donation"
    return projects.find((p) => p.id === projectId)?.name || "Unknown Project"
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <HandHeart className="mx-auto h-12 w-12 text-green-600" />
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Our Generous Donors</h1>
        <p className="mt-2 text-lg text-gray-600">
          May Allah reward every single one of you. Your contributions make this work possible.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          {donations.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No donations recorded yet. Be the first to contribute!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.donorName}</TableCell>
                    <TableCell className="text-gray-600">{getProjectName(donation.projectId)}</TableCell>
                    <TableCell className="text-gray-600">{donation.date}</TableCell>
                    <TableCell className="text-right font-semibold text-green-700">
                      {formatCurrency(donation.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
