"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiClient } from "@/lib/api-client"

interface ContactInquiry {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  childAge?: string
  message: string
  status: "new" | "contacted" | "scheduled" | "enrolled" | "closed"
  createdAt: string
}

export default function ContactPage() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInquiries()
  }, [])

  async function fetchInquiries() {
    try {
      const response = await apiClient.getContactInquiries()
      if (response.success) {
        setInquiries(response.data || [])
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error)
    } finally {
      setLoading(false)
    }
  }

  async function updateInquiryStatus(id: string, status: string) {
    try {
      const response = await apiClient.updateContactInquiry(id, { status })
      if (response.success) {
        fetchInquiries()
      }
    } catch (error) {
      console.error("Error updating inquiry:", error)
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "scheduled":
        return "bg-purple-100 text-purple-800"
      case "enrolled":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading inquiries...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contact Inquiries</h1>
        <p className="text-muted-foreground">Manage parent inquiries and follow-ups</p>
      </div>

      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <Card key={inquiry._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {inquiry.firstName} {inquiry.lastName}
                  </CardTitle>
                  <CardDescription>
                    {inquiry.email} • {inquiry.phone}
                    {inquiry.childAge && ` • Child age: ${inquiry.childAge}`}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                  <Select value={inquiry.status} onValueChange={(value) => updateInquiryStatus(inquiry._id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="enrolled">Enrolled</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <h4 className="font-medium">Message:</h4>
                  <p className="text-muted-foreground">{inquiry.message}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Received: {new Date(inquiry.createdAt).toLocaleString()}</span>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      Schedule Visit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {inquiries.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No contact inquiries found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
