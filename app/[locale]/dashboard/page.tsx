import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "./components/date-range-picker"
import { MainNav } from "@/components/main-nav"
import { Overview } from "./components/overview"
import { RecentSales } from "./components/recent-sales"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/ModeToggle"
import LanguageToggle from "@/components/LanguageToggle"
import { NavBarFinal } from "@/components/NavBar"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
      <NavBarFinal />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Tasks Done
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M6 12l4 4L18 6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">324</div>
                    <p className="text-xs text-muted-foreground">
                      in the last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Sleep Average
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M4 12v24m40-7v7m0-7H4"/>
                      <path d="M22 16v13h22V19a3 3 0 0 0-3-3z"/>
                      <circle cx="13" cy="20" r="3" fill="currentColor"/>
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">6 Hours</div>
                    <p className="text-xs text-muted-foreground">
                      a day on average this month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sports Average</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M36 15a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z"/>
                        <path d="m12 16.77l8.003-2.772L31 19.247l-10.997 8.197L31 34.684l-6.992 9.314M35.32 21.643l2.682 1.459L44 17.466M16.849 31.545l-2.97 3.912l-9.875 5.54"/>
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3 Days</div>
                    <p className="text-xs text-muted-foreground">
                      a week on average this month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Tasks In Progress
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">13</div>
                    <p className="text-xs text-muted-foreground">
                      tasks to complete
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>My sleep this week</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Tasks in progress</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
