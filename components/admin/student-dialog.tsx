"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { apiClient } from "@/lib/api-client"

interface StudentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student?: any
  onSuccess: () => void
}

export function StudentDialog({ open, onOpenChange, student, onSuccess }: StudentDialogProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
    programId: "",
    medicalInfo: {
      allergies: "",
      medications: "",
      specialNeeds: "",
    },
  })
  const [programs, setPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      fetchPrograms()
      if (student) {
        setFormData({
          firstName: student.firstName || "",
          lastName: student.lastName || "",
          dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split("T")[0] : "",
          parentName: student.parentName || "",
          parentEmail: student.parentEmail || "",
          parentPhone: student.parentPhone || "",
          address: {
            street: student.address?.street || "",
            city: student.address?.city || "",
            state: student.address?.state || "",
            zipCode: student.address?.zipCode || "",
          },
          emergencyContact: {
            name: student.emergencyContact?.name || "",
            relationship: student.emergencyContact?.relationship || "",
            phone: student.emergencyContact?.phone || "",
          },
          programId: student.programId || "",
          medicalInfo: {
            allergies: student.medicalInfo?.allergies?.join(", ") || "",
            medications: student.medicalInfo?.medications?.join(", ") || "",
            specialNeeds: student.medicalInfo?.specialNeeds || "",
          },
        })
      } else {
        // Reset form for new student
        setFormData({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          parentName: "",
          parentEmail: "",
          parentPhone: "",
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
          },
          emergencyContact: {
            name: "",
            relationship: "",
            phone: "",
          },
          programId: "",
          medicalInfo: {
            allergies: "",
            medications: "",
            specialNeeds: "",
          },
        })
      }
    }
  }, [open, student])

  async function fetchPrograms() {
    try {
      const response = await apiClient.getPrograms()
      if (response.success) {
        setPrograms(response.data || [])
      }
    } catch (error) {
      console.error("Error fetching programs:", error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = {
        ...formData,
        medicalInfo: {
          allergies: formData.medicalInfo.allergies
            ? formData.medicalInfo.allergies.split(",").map((s) => s.trim())
            : [],
          medications: formData.medicalInfo.medications
            ? formData.medicalInfo.medications.split(",").map((s) => s.trim())
            : [],
          specialNeeds: formData.medicalInfo.specialNeeds,
        },
      }

      const response = student
        ? await apiClient.updateStudent(student._id, submitData)
        : await apiClient.createStudent(submitData)

      if (response.success) {
        onSuccess()
        onOpenChange(false)
      } else {
        alert("Error saving student: " + response.error)
      }
    } catch (error) {
      console.error("Error saving student:", error)
      alert("Error saving student")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{student ? "Edit Student" : "Add New Student"}</DialogTitle>
          <DialogDescription>
            {student ? "Update student information" : "Enter student details to create a new enrollment"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="programId">Program</Label>
              <Select
                value={formData.programId}
                onValueChange={(value) => setFormData({ ...formData, programId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a program" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((program) => (
                    <SelectItem key={program._id} value={program._id}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Parent Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Parent Information</h3>
            <div>
              <Label htmlFor="parentName">Parent Name</Label>
              <Input
                id="parentName"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentEmail">Parent Email</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="parentPhone">Parent Phone</Label>
                <Input
                  id="parentPhone"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Address</h3>
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                value={formData.address.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.address.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, state: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  value={formData.address.zipCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, zipCode: e.target.value },
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Emergency Contact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyName">Name</Label>
                <Input
                  id="emergencyName"
                  value={formData.emergencyContact.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: { ...formData.emergencyContact, name: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Input
                  id="relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: { ...formData.emergencyContact, relationship: e.target.value },
                    })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Phone</Label>
              <Input
                id="emergencyPhone"
                value={formData.emergencyContact.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, phone: e.target.value },
                  })
                }
                required
              />
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Medical Information (Optional)</h3>
            <div>
              <Label htmlFor="allergies">Allergies (comma-separated)</Label>
              <Input
                id="allergies"
                value={formData.medicalInfo.allergies}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medicalInfo: { ...formData.medicalInfo, allergies: e.target.value },
                  })
                }
                placeholder="e.g., Peanuts, Dairy, Shellfish"
              />
            </div>
            <div>
              <Label htmlFor="medications">Medications (comma-separated)</Label>
              <Input
                id="medications"
                value={formData.medicalInfo.medications}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medicalInfo: { ...formData.medicalInfo, medications: e.target.value },
                  })
                }
                placeholder="e.g., Inhaler, EpiPen"
              />
            </div>
            <div>
              <Label htmlFor="specialNeeds">Special Needs</Label>
              <Textarea
                id="specialNeeds"
                value={formData.medicalInfo.specialNeeds}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medicalInfo: { ...formData.medicalInfo, specialNeeds: e.target.value },
                  })
                }
                placeholder="Any special needs or accommodations"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : student ? "Update Student" : "Add Student"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
