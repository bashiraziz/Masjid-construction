import { getDonations } from "./actions"
import { AddDonationForm } from "./add-donation-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

// This ensures the page is rendered dynamically on each request,
// allowing access to environment variables for the database connection.
export const dynamic = "force-dynamic"

export default async function DonationsPage() {
  const donations = await getDonations()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">Donations</h1>

      <AddDonationForm />

      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          {donations.length === 0 ? (
            <p className="text-center text-gray-500">No donations yet. Be the first to donate!</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Project</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">{donation.donor_name}</TableCell>
                      <TableCell>{formatCurrency(donation.amount)}</TableCell>
                      <TableCell>{new Date(donation.donation_date).toLocaleDateString()}</TableCell>
                      <TableCell>{donation.project_id ? `Project ${donation.project_id}` : "General"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
