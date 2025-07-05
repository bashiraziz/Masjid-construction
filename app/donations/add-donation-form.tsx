"use client"

import { useActionState, useRef } from "react"
import addDonation from "./actions" // Updated import: no curly braces
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { projects } from "@/lib/data" // Import projects for the dropdown
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddDonationForm() {
  const [state, formAction] = useActionState(addDonation, null)
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  // Show toast message when state changes
  if (state?.message) {
    toast({
      title: state.message.includes("successfully") ? "Success!" : "Error!",
      description: state.message,
      variant: state.message.includes("successfully") ? "default" : "destructive",
    })
    if (state.message.includes("successfully")) {
      formRef.current?.reset() // Reset form on success
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Add New Donation</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="donorName">Donor Name</Label>
            <Input id="donorName" name="donorName" placeholder="Anonymous" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input id="amount" name="amount" type="number" step="0.01" placeholder="50.00" required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="projectId">Project (Optional)</Label>
            <Select name="projectId">
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Donation</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={String(project.id)}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Submit Donation
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
