"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { apiClient } from "@/lib/api-client"
import { StudentDialog } from "@/components/admin/student-dialog"

interface Student {
  _id: string
  firstName: string
  lastName: string
  age: number
  parentName: string
  parentEmail: string
  parentPhone: string
  status: "active" | "inactive" | "pending"
  enrollmentDate: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    try {
      const response = await apiClient.getStudents()
      if (response.success) {
        setStudents(response.data || [])
      }
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setLoading(false)
    }
  }

  function handleAddStudent() {
    setSelectedStudent(null)
    setDialogOpen(true)
  }

  function handleEditStudent(student: Student) {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  async function handleDeleteStudent(id: string) {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await apiClient.deleteStudent(id)
        if (response.success) {
          fetchStudents()
        }
      } catch (error) {
        console.error("Error deleting student:", error)
      }
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading students...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground">Manage student enrollments and information</p>
        </div>
        <Button onClick={handleAddStudent} className="bg-primary hover:bg-primary/90">
          Add Student
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card key={student._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {student.firstName} {student.lastName}
                  </CardTitle>
                  <CardDescription>Age: {student.age} years</CardDescription>
                </div>
                <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium">Parent: {student.parentName}</p>
                <p className="text-sm text-muted-foreground">{student.parentEmail}</p>
                <p className="text-sm text-muted-foreground">{student.parentPhone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button size="sm" variant="outline" onClick={() => handleEditStudent(student)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteStudent(student._id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {students.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No students found. Add your first student to get started.</p>
          </CardContent>
        </Card>
      )}

      <StudentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        student={selectedStudent}
        onSuccess={fetchStudents}
      />
    </div>
  )
}
