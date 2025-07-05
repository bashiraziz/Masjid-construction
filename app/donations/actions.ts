"use server"

import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"

export interface Donation {
  id: number
  amount: number
  donor_name: string
  project_id?: number // Optional, as some donations might be general
  created_at: string
}

export async function getDonations(): Promise<Donation[]> {
  // If the connection string isn’t available (e.g. during a local preview or
  // when the env var hasn’t been set in Vercel yet) bail out gracefully.
  if (!process.env.POSTGRES_URL) {
    console.warn("POSTGRES_URL env var is missing – returning an empty donations array.")
    return []
  }

  console.log("Attempting to connect to Vercel Postgres and fetch donations...")
  try {
    const { rows } = await sql<Donation>`SELECT * FROM donations ORDER BY created_at DESC`
    console.log("Successfully fetched donations:", rows.length, "records.")
    return rows
  } catch (error) {
    console.error("Failed to fetch donations:", error)
    return []
  }
}

export async function addDonation(formData: FormData) {
  const amount = Number.parseFloat(formData.get("amount") as string)
  const donor_name = formData.get("donor_name") as string
  const projectId = formData.get("projectId") as string | undefined // Get projectId from form

  if (isNaN(amount) || amount <= 0) {
    return { success: false, message: "Invalid amount provided." }
  }
  if (!donor_name || donor_name.trim() === "") {
    return { success: false, message: "Donor name cannot be empty." }
  }

  try {
    if (projectId) {
      // If projectId is provided, link the donation to a specific project
      await sql`
        INSERT INTO donations (amount, donor_name, project_id)
        VALUES (${amount}, ${donor_name}, ${Number.parseInt(projectId)});
      `
    } else {
      // Otherwise, it's a general donation
      await sql`
        INSERT INTO donations (amount, donor_name)
        VALUES (${amount}, ${donor_name});
      `
    }

    revalidatePath("/donations") // Revalidate the donations page
    revalidatePath("/projects") // Revalidate projects page to update totals
    revalidatePath("/") // Revalidate homepage to update overall progress
    return { success: true, message: "Donation added successfully!" }
  } catch (error) {
    console.error("Failed to add donation:", error)
    return { success: false, message: "Failed to add donation." }
  }
}
