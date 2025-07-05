"use server"

import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"

export interface Donation {
  id: number
  donor_name: string
  amount: number
  donation_date: string
  project_id?: number | null // Make project_id nullable
}

export async function getDonations(): Promise<Donation[]> {
  console.log("Attempting to connect to Vercel Postgres and fetch donations...")
  try {
    const { rows } = await sql<Donation>`SELECT * FROM donations ORDER BY donation_date DESC, id DESC`
    console.log(`Successfully fetched ${rows.length} donations from the database.`)
    return rows
  } catch (error) {
    console.error("Failed to fetch donations:", error)
    // In a production app, you might want to log this error to a monitoring service
    // and return an empty array or throw a more specific error.
    return []
  }
}

// Changed to default export
export default async function addDonation(prevState: any, formData: FormData) {
  const donorName = formData.get("donorName") as string
  const amount = Number.parseFloat(formData.get("amount") as string)
  const projectId = formData.get("projectId") ? Number.parseInt(formData.get("projectId") as string) : null // Handle optional project ID

  if (!donorName || isNaN(amount) || amount <= 0) {
    return { message: "Invalid input: Donor name and a positive amount are required." }
  }

  try {
    await sql`
      INSERT INTO donations (donor_name, amount, donation_date, project_id)
      VALUES (${donorName}, ${amount}, CURRENT_DATE, ${projectId})
    `
    revalidatePath("/donations") // Revalidate the donations page to show the new entry
    return { message: "Donation added successfully!" }
  } catch (error) {
    console.error("Failed to add donation:", error)
    return { message: "Failed to add donation. Please try again." }
  }
}
