import { getDonations } from "./actions"
import { AddDonationForm } from "./add-donation-form"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// This ensures the page is dynamically rendered on each request,
// allowing access to environment variables for the database connection.
export const dynamic = "force-dynamic"

export default async function DonationsPage() {
  const donations = await getDonations()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">Donations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add New Donation</CardTitle>
            </CardHeader>
            <CardContent>
              <AddDonationForm />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
            </CardHeader>
            <CardContent>
              {donations.length === 0 ? (
                <p className="text-center text-gray-500">No donations yet. Be the first!</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Amount</TableHead>
                        <TableHead>Donor</TableHead>
                        <TableHead>Project ID</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donations.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell className="font-medium">{formatCurrency(donation.amount)}</TableCell>
                          <TableCell>{donation.donor_name || "Anonymous"}</TableCell>
                          <TableCell>{donation.project_id || "General"}</TableCell>
                          <TableCell>{new Date(donation.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
