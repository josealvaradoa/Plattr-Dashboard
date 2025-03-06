import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Extract user's name from email or use their email
  const userName = user.email?.split('@')[0] || 'User';
  const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-2">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {formattedName}!</h1>
        <p className="text-muted-foreground">Here&apos;s an overview of your dashboard</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Email</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground pt-2">
                User ID: {user.id.substring(0, 8)}...
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="text-sm">Last login: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-3 text-sm">
                <p className="font-medium">Recent activity will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
      
      </div>
      
      {/* Recent Activity Section */}
      <div className="mt-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="text-center py-6">
                <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-muted-foreground">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                    <line x1="12" y1="16" x2="12" y2="8"></line>
                  </svg>
                </div>
                <h3 className="font-medium text-lg">No recent activity</h3>
                <p className="text-muted-foreground text-sm mt-1">Your recent activity will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
