"use server"

import { sql } from "@vercel/postgres"
import type { Donation } from "@/lib/data" // Import type for consistency

export async function getDonations(): Promise<Donation[]> {
  try {
    console.log("Attempting to connect to Vercel Postgres and fetch donations...")
    const { rows } =
      await sql`SELECT id, donor_name, amount, donation_date, project_id FROM donations ORDER BY donation_date DESC;`

    // Map the database rows to your Donation type, converting snake_case to camelCase
    const donations: Donation[] = rows.map((row) => ({
      id: row.id,
      donorName: row.donor_name,
      amount: Number.parseFloat(row.amount), // Convert numeric string to number
      date: row.donation_date.toISOString().split("T")[0], // Format date to YYYY-MM-DD
      projectId: row.project_id,
    }))

    console.log(`Successfully fetched ${donations.length} donations from the database.`)
    return donations
  } catch (error) {
    console.error(
      "Failed to fetch donations from database. Please check Vercel Postgres connection and environment variables:",
      error,
    )
    // In a real application, you might want to throw a more specific error
    // or return an empty array and handle it gracefully on the client.
    return []
  }
}
