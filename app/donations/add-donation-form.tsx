"use client"

import { useState, useEffect } from "react"
import { useActionState } from "react"
import { addDonation } from "./actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { projects } from "@/lib/data" // Import projects for the dropdown

export function AddDonationForm() {
  const [state, formAction] = useActionState(addDonation, null)
  const { toast } = useToast()
  const [selectedProjectId, setSelectedProjectId] = useState<string>("")

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success!",
        description: state.message,
        variant: "default",
      })
      // Optionally reset form fields here if needed
      setSelectedProjectId("") // Reset project selection
      const form = document.getElementById("add-donation-form") as HTMLFormElement
      form.reset() // Reset other form fields
    } else if (state?.success === false) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      })
    }
  }, [state, toast])

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Add New Donation</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="add-donation-form" action={formAction} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="donorName">Donor Name</Label>
            <Input id="donorName" name="donorName" placeholder="Anonymous" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input id="amount" name="amount" type="number" step="0.01" placeholder="50.00" required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="projectId">Project</Label>
            <Select name="projectId" value={selectedProjectId} onValueChange={setSelectedProjectId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={String(project.id)}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white">
            Submit Donation
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
