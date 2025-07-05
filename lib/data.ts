// Define the Project interface
export interface Project {
  id: number
  name: string
  slug: string
  description: string
  goal: number
  raised: number
  category: string
  location: string
  startDate: string
  endDate: string
  status: string
  impact: string
  impactDetails: string
  image?: string // Optional single image
  images?: string[] // Optional array of images
}

// Exchange rate for UGX to USD (example rate)
export const UGX_EXCHANGE_RATE = 3750 // 1 USD = 3750 UGX (example)

// Placeholder project data
export const projects: Project[] = [
  {
    id: 1,
    name: "New Mosque Construction",
    slug: "new-mosque-construction",
    description:
      "Help us build a new mosque to accommodate our growing community. This project includes the main prayer hall, ablution facilities, and a small library.",
    goal: 500000000, // UGX
    raised: 350000000, // UGX
    category: "Construction",
    location: "Central District",
    startDate: "2023-01-15",
    endDate: "2025-12-31",
    status: "Ongoing",
    impact: "provide a larger and more accessible place of worship",
    impactDetails:
      "creating a welcoming environment for prayer, education, and community gatherings. The new facility will include dedicated spaces for women and children, ensuring everyone has comfortable access to religious services and educational programs.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
  {
    id: 2,
    name: "Orphanage Support Program",
    slug: "orphanage-support-program",
    description:
      "Provide essential support for orphans, including food, education, and healthcare. Your donation ensures a brighter future for vulnerable children.",
    goal: 100000000, // UGX
    raised: 80000000, // UGX
    category: "Social Welfare",
    location: "Rural Area",
    startDate: "2024-03-01",
    endDate: "2024-12-31",
    status: "Ongoing",
    impact: "improve the living conditions and future prospects of orphaned children",
    impactDetails:
      "providing nutritious meals, access to quality education, and necessary medical care. This support helps them grow into self-sufficient individuals and contributes positively to society.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
  {
    id: 3,
    name: "Water Well Project",
    slug: "water-well-project",
    description:
      "Fund the drilling of new water wells in drought-affected areas, providing clean and safe drinking water to communities.",
    goal: 75000000, // UGX
    raised: 75000000, // UGX
    category: "Infrastructure",
    location: "Arid Region",
    startDate: "2023-06-01",
    endDate: "2024-02-28",
    status: "Completed",
    impact: "ensure access to clean and safe drinking water for underserved communities",
    impactDetails:
      "reducing waterborne diseases and improving overall public health. This project also frees up time for women and children who previously spent hours fetching water, allowing them to pursue education and other productive activities.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
  {
    id: 4,
    name: "Quran Memorization Program",
    slug: "quran-memorization-program",
    description:
      "Support students in memorizing the Holy Quran by providing resources, teachers, and a conducive learning environment.",
    goal: 50000000, // UGX
    raised: 40000000, // UGX
    category: "Education",
    location: "Mosque Learning Center",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "Ongoing",
    impact: "foster a deeper understanding and connection to the Quran among students",
    impactDetails:
      "providing structured learning, qualified teachers, and necessary materials. This program helps preserve Islamic knowledge and nurtures future leaders within the community.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
  {
    id: 5,
    name: "Community Outreach & Dawah",
    slug: "community-outreach-dawah",
    description:
      "Fund initiatives to spread the message of Islam and provide support to new reverts and those interested in learning more.",
    goal: 30000000, // UGX
    raised: 25000000, // UGX
    category: "Outreach",
    location: "Various Community Centers",
    startDate: "2023-09-01",
    endDate: "2024-08-31",
    status: "Ongoing",
    impact: "promote understanding of Islam and support community integration",
    impactDetails:
      "organizing educational workshops, interfaith dialogues, and providing resources for new Muslims. This fosters a more inclusive and informed society.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
]

// Function to calculate total raised from the placeholder data
export function getTotalRaised(): number {
  return projects.reduce((sum, project) => sum + project.raised, 0)
}

// Function to get total budget from the placeholder data
export function getTotalBudget(): number {
  return projects.reduce((sum, project) => sum + project.goal, 0)
}
