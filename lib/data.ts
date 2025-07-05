export interface Project {
  id: number
  name: string
  slug: string
  description: string
  raised: number
  goal: number
  images: string[] // Ensure this is an array of strings
  videos: string[]
  budgetPhases: BudgetPhase[]
  accounting: AccountingEntry[]
}

export interface BudgetPhase {
  name: string
  usdAmount: number
  description?: string
}

export interface AccountingEntry {
  id: number
  date: string
  description: string
  amount: number
  type: "sent" | "spent"
  receiptUrl?: string
}

export interface Donation {
  id: number
  donorName: string
  amount: number
  date: string
  projectId?: number // Optional, as some donations might be general
}

// --- START_PROJECTS_DATA ---
export const projects: Project[] = [
  {
    id: 1,
    name: "Ageri Mosque Construction",
    slug: "ageri-mosque",
    description:
      "The Ageri Mosque project aims to build a new, larger mosque to serve the growing Muslim community in Ageri, Uganda. The current facility is insufficient for the community's needs, and a new mosque will provide ample space for daily prayers, Friday sermons, and community events. It will also include facilities for Islamic education and women's prayer.",
    raised: 35000,
    goal: 60000,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    ],
    budgetPhases: [
      {
        name: "Phase 1: Land Acquisition & Foundation",
        usdAmount: 15000,
        description: "Purchase of land and laying the mosque's foundation.",
      },
      {
        name: "Phase 2: Structure & Walls",
        usdAmount: 25000,
        description: "Construction of the main building structure and walls.",
      },
      {
        name: "Phase 3: Roofing & Finishing",
        usdAmount: 20000,
        description: "Installation of the roof, windows, doors, and interior plastering.",
      },
      {
        name: "Phase 4: Minbar & Mihrab",
        usdAmount: 5000,
        description: "Construction of the Minbar and Mihrab, and final interior touches.",
      },
    ],
    accounting: [
      {
        id: 1,
        date: "2025-06-15",
        description: "Land purchase payment",
        amount: 10000,
        type: "spent",
        receiptUrl: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        date: "2025-06-20",
        description: "Cement delivery",
        amount: 2500,
        type: "spent",
        receiptUrl: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        date: "2025-06-25",
        description: "Initial labor costs",
        amount: 1500,
        type: "spent",
        receiptUrl: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    id: 2,
    name: "Hidayah Mosque Renovation",
    slug: "hidayah-mosque",
    description:
      "The Hidayah Mosque, a beloved community landmark, is in dire need of renovation. This project aims to restore its structural integrity, upgrade its prayer facilities, and enhance its capacity to serve the local community. Renovations will include roof repairs, new flooring, improved ventilation, and modern ablution facilities.",
    raised: 15000,
    goal: 25000,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    ],
    budgetPhases: [
      { name: "Phase 1: Structural Repairs", usdAmount: 8000, description: "Repairing roof, walls, and foundation." },
      { name: "Phase 2: Interior Upgrades", usdAmount: 10000, description: "New flooring, painting, and lighting." },
      { name: "Phase 3: Ablution Facilities", usdAmount: 7000, description: "Modernizing Wudu and restroom areas." },
    ],
    accounting: [
      {
        id: 1,
        date: "2025-05-01",
        description: "Roof repair materials",
        amount: 3000,
        type: "spent",
        receiptUrl: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        date: "2025-05-10",
        description: "Plumbing work",
        amount: 1500,
        type: "spent",
        receiptUrl: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
]
// --- END_PROJECTS_DATA ---

export const UGX_EXCHANGE_RATE = 3500 // 1 USD = 3500 UGX

/**
 * Total USD raised across all projects.
 */
export const getTotalRaised = () => projects.reduce((sum, p) => sum + p.raised, 0)

/**
 * Total USD *goal* (budget) across all projects.
 */
export const getTotalBudget = () => projects.reduce((sum, p) => p.goal + sum, 0)
