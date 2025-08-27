"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";

interface DashboardStats {
  totalStudents: number;
  totalStaff: number;
  totalPrograms: number;
  pendingInquiries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalStaff: 0,
    totalPrograms: 0,
    pendingInquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [studentsRes, staffRes, programsRes, contactRes] =
          await Promise.all([
            apiClient.getStudents(),
            apiClient.getStaff(),
            apiClient.getPrograms(),
            apiClient.getContactInquiries(),
          ]);

        setStats({
          totalStudents: studentsRes.data?.length || 0,
          totalStaff: staffRes.data?.length || 0,
          totalPrograms: programsRes.data?.length || 0,
          pendingInquiries:
            contactRes.data?.filter((inquiry: any) => inquiry.status === "new")
              .length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome to Prarambh Academy admin dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <span className="text-2xl">👶</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
            <span className="text-2xl">👩‍🏫</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStaff}</div>
            <p className="text-xs text-muted-foreground">Active staff</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programs</CardTitle>
            <span className="text-2xl">📚</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPrograms}</div>
            <p className="text-xs text-muted-foreground">Available programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Inquiries
            </CardTitle>
            <span className="text-2xl">📧</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingInquiries}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 hover:bg-muted cursor-pointer transition-colors">
                <div className="text-center">
                  <span className="text-2xl block mb-2">➕</span>
                  <span className="text-sm font-medium">Add Student</span>
                </div>
              </Card>
              <Card className="p-4 hover:bg-muted cursor-pointer transition-colors">
                <div className="text-center">
                  <span className="text-2xl block mb-2">👥</span>
                  <span className="text-sm font-medium">Add Staff</span>
                </div>
              </Card>
              <Card className="p-4 hover:bg-muted cursor-pointer transition-colors">
                <div className="text-center">
                  <span className="text-2xl block mb-2">📋</span>
                  <span className="text-sm font-medium">New Program</span>
                </div>
              </Card>
              <Card className="p-4 hover:bg-muted cursor-pointer transition-colors">
                <div className="text-center">
                  <span className="text-2xl block mb-2">🎯</span>
                  <span className="text-sm font-medium">New Activity</span>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New student enrollment</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Contact inquiry received
                  </p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Staff member updated</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
