import type { Donation } from "@/app/donations/actions"

export interface Project {
  id: number
  name: string
  description: string
  longDescription?: string
  goal: number
  category: string
  location: string
  images?: string[]
  slug: string
}

// In-memory data for projects (replace with database fetching later)
export const projects: Project[] = [
  {
    id: 1,
    name: "New Mosque Construction",
    description: "Building a new, larger mosque to accommodate our growing community.",
    longDescription:
      "This ambitious project aims to construct a state-of-the-art mosque facility that will serve as a spiritual hub for our expanding community. The new building will feature a larger prayer hall, dedicated spaces for women and children, a community center, and enhanced educational facilities. Your support will help us create a welcoming and functional space for generations to come.",
    goal: 500000,
    category: "Construction",
    location: "Downtown City",
    images: ["/placeholder.svg?height=400&width=600"],
    slug: "new-mosque-construction",
  },
  {
    id: 2,
    name: "Orphanage Support Program",
    description: "Providing food, shelter, education, and care for orphaned children.",
    longDescription:
      "Our orphanage support program is dedicated to providing a safe, nurturing, and stimulating environment for orphaned children. We ensure they receive nutritious meals, comfortable shelter, quality education, and essential healthcare. Beyond basic needs, we focus on their holistic development, offering emotional support and opportunities for personal growth. Your donation directly impacts the lives of these vulnerable children, giving them a chance for a brighter future.",
    goal: 150000,
    category: "Community",
    location: "Rural Village",
    images: ["/placeholder.svg?height=400&width=600"],
    slug: "orphanage-support-program",
  },
  {
    id: 3,
    name: "Water Well Project",
    description: "Drilling new water wells in drought-affected areas to provide clean water.",
    longDescription:
      "Access to clean and safe drinking water is a fundamental human right. Our water well project focuses on drilling new wells in remote, drought-stricken regions where communities lack reliable water sources. This initiative not only provides clean water for drinking and sanitation but also improves health, reduces water-borne diseases, and frees up time for education and economic activities, especially for women and children who often bear the burden of water collection.",
    goal: 75000,
    category: "Humanitarian",
    location: "Arid Region",
    images: ["/placeholder.svg?height=400&width=600"],
    slug: "water-well-project",
  },
  {
    id: 4,
    name: "Quran Memorization Classes",
    description: "Funding teachers and resources for children and adults to memorize the Quran.",
    longDescription:
      "Our Quran Memorization Classes aim to facilitate the memorization of the Holy Quran for students of all ages. We provide qualified teachers, essential learning materials, and a conducive environment for spiritual growth. This program helps individuals deepen their understanding of Islam, strengthen their faith, and preserve the divine word. Your contribution supports the continuity of this noble endeavor.",
    goal: 30000,
    category: "Education",
    location: "Mosque Learning Center",
    images: ["/placeholder.svg?height=400&width=600"],
    slug: "quran-memorization-classes",
  },
  {
    id: 5,
    name: "Food Aid for Needy Families",
    description: "Distributing food packages to families struggling with food insecurity.",
    longDescription:
      "The Food Aid for Needy Families program provides essential food packages to vulnerable families facing food insecurity. Our distributions ensure that families have access to nutritious staples, helping to alleviate hunger and improve overall well-being. This initiative is particularly crucial during times of economic hardship or natural disasters, offering a lifeline to those most in need.",
    goal: 100000,
    category: "Humanitarian",
    location: "Local Community",
    images: ["/placeholder.svg?height=400&width=600"],
    slug: "food-aid-for-needy-families",
  },
]

// In-memory data for donations (replace with database fetching later)
// This is a placeholder and will be replaced by actual database data
const inMemoryDonations: Donation[] = [
  { id: 1, donor_name: "Anonymous", amount: 100, donation_date: "2023-01-15", project_id: 1 },
  { id: 2, donor_name: "Jane Doe", amount: 250, donation_date: "2023-01-16", project_id: 1 },
  { id: 3, donor_name: "John Smith", amount: 50, donation_date: "2023-01-17", project_id: 2 },
  { id: 4, donor_name: "Anonymous", amount: 75, donation_date: "2023-01-18", project_id: null }, // General donation
  { id: 5, donor_name: "Community Member", amount: 150, donation_date: "2023-01-19", project_id: 3 },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getTotalBudget(): number {
  return projects.reduce((sum, project) => sum + project.goal, 0)
}

export function getTotalDonated(projectId?: number): number {
  // In a real application, this would fetch from the database
  // For now, we'll use the in-memory data
  let filteredDonations = inMemoryDonations
  if (projectId) {
    filteredDonations = inMemoryDonations.filter((donation) => donation.project_id === projectId)
  }
  return filteredDonations.reduce((sum, donation) => sum + donation.amount, 0)
}

// Example exchange rate for Ugandan Shillings (UGX)
export const UGX_EXCHANGE_RATE = 3750 // 1 USD = 3750 UGX (example rate)
