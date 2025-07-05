"use server"

import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"

export async function getDonations() {
  try {
    console.log("Attempting to connect to Vercel Postgres and fetch donations...")
    const { rows } = await sql`SELECT * FROM donations ORDER BY donation_date DESC, id DESC;`
    console.log(`Successfully fetched ${rows.length} donations from the database.`)
    return rows
  } catch (error) {
    console.error("Failed to fetch donations:", error)
    return []
  }
}

export async function addDonation(prevState: any, formData: FormData) {
  const donorName = formData.get("donorName") as string
  const amount = Number.parseFloat(formData.get("amount") as string)
  const projectId = Number.parseInt(formData.get("projectId") as string)
  const donationDate = new Date().toISOString().split("T")[0] // Current date

  if (!donorName || !amount || isNaN(amount) || !projectId || isNaN(projectId)) {
    return { success: false, message: "Invalid input. Please fill all fields correctly." }
  }

  try {
    await sql`
      INSERT INTO donations (donor_name, amount, donation_date, project_id)
      VALUES (${donorName}, ${amount}, ${donationDate}, ${projectId});
    `
    revalidatePath("/donations")
    return { success: true, message: "Donation added successfully!" }
  } catch (error) {
    console.error("Failed to add donation:", error)
    return { success: false, message: "Failed to add donation. Please try again." }
  }
}
