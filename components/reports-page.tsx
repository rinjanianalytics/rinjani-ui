"use client"

import { useState } from "react"
import SidebarMenu from "@/components/sidebar-menu"
import HeaderTop from "@/components/header-top"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, FileText, BarChart2, PieChart, Calendar, Clock, User, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Animation settings
  const animationStyle = {
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Sample reports data
  const reports = [
    {
      id: "REP-2025-042",
      title: "Monthly Security Posture Assessment",
      type: "Security",
      author: "Security Team",
      created: "2025-05-10",
      status: "Published",
      description: "Monthly assessment of the organization's security posture, including vulnerabilities, incidents, and compliance status."
    },
    {
      id: "REP-2025-041",
      title: "Quarterly Threat Intelligence Summary",
      type: "Threat Intelligence",
      author: "Threat Intelligence Team",
      created: "2025-05-01",
      status: "Published",
      description: "Summary of threat intelligence findings and trends for Q2 2025."
    },
    {
      id: "REP-2025-040",
      title: "Ransomware Campaign Analysis",
      type: "Threat Analysis",
      author: "Incident Response Team",
      created: "2025-04-25",
      status: "Published",
      description: "Detailed analysis of recent ransomware campaign targeting the financial sector."
    },
    {
      id: "REP-2025-039",
      title: "Cloud Security Assessment",
      type: "Security",
      author: "Cloud Security Team",
      created: "2025-04-20",
      status: "Published",
      description: "Assessment of cloud infrastructure security controls and recommendations for improvement."
    },
    {
      id: "REP-2025-038",
      title: "Phishing Campaign Investigation",
      type: "Incident",
      author: "Incident Response Team",
      created: "2025-04-15",
      status: "Draft",
      description: "Investigation report for recent targeted phishing campaign against executive team."
    },
    {
      id: "REP-2025-037",
      title: "Vulnerability Management Metrics",
      type: "Security",
      author: "Security Operations",
      created: "2025-04-10",
      status: "Published",
      description: "Metrics and KPIs for vulnerability management program performance."
    }
  ]

  // Report templates
  const reportTemplates = [
    { name: "Security Incident Report", description: "Template for documenting security incidents" },
    { name: "Vulnerability Assessment", description: "Template for vulnerability assessment reports" },
    { name: "Threat Intelligence Brief", description: "Template for threat intelligence briefings" },
    { name: "Compliance Audit Report", description: "Template for compliance audit findings" }
  ]

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Menu Component */}
      <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} animationStyle={animationStyle} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <HeaderTop toggleSidebar={toggleSidebar} title="Reports" />

        {/* Main Content */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text font-header mb-4 md:mb-0">SECURITY REPORTS</h1>
            <Tabs defaultValue="all" className="w-auto" onValueChange={setActiveTab}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="all" className="font-subheader text-xs">ALL</TabsTrigger>
                <TabsTrigger value="security" className="font-subheader text-xs">SECURITY</TabsTrigger>
                <TabsTrigger value="threat" className="font-subheader text-xs">THREAT</TabsTrigger>
                <TabsTrigger value="incident" className="font-subheader text-xs">INCIDENT</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input 
                placeholder="Search reports..." 
                className="pl-12 bg-card border-none rounded-xl h-14 shadow-sm"
              />
            </div>
            <Button variant="outline" className="h-14 px-4 flex items-center gap-2 bg-card border-none rounded-xl shadow-sm">
              <Filter size={18} />
              <span className="font-subheader">FILTERS</span>
            </Button>
            <Button className="h-14 px-4 flex items-center gap-2 rounded-xl">
              <FileText size={18} />
              <span className="font-subheader">NEW REPORT</span>
            </Button>
          </div>

          {/* Report Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">TOTAL REPORTS</p>
                  <p className="text-3xl font-bold font-header mt-1">42</p>
                  <p className="text-xs text-muted-foreground mt-1">+8 this month</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">SECURITY REPORTS</p>
                  <p className="text-3xl font-bold font-header mt-1">18</p>
                  <p className="text-xs text-muted-foreground mt-1">+3 this month</p>
                </div>
                <div className="p-3 bg-blue-100/50 dark:bg-blue-900/20 rounded-full">
                  <BarChart2 className="h-6 w-6 text-blue-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">THREAT REPORTS</p>
                  <p className="text-3xl font-bold font-header mt-1">15</p>
                  <p className="text-xs text-muted-foreground mt-1">+2 this month</p>
                </div>
                <div className="p-3 bg-amber-100/50 dark:bg-amber-900/20 rounded-full">
                  <PieChart className="h-6 w-6 text-amber-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">INCIDENT REPORTS</p>
                  <p className="text-3xl font-bold font-header mt-1">9</p>
                  <p className="text-xs text-muted-foreground mt-1">+3 this month</p>
                </div>
                <div className="p-3 bg-red-100/50 dark:bg-red-900/20 rounded-full">
                  <Calendar className="h-6 w-6 text-red-500/60" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reports List */}
          <div className="mb-8">
            <h2 className="text-xl font-bold gradient-text mb-4 font-header">RECENT REPORTS</h2>
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white font-header">{report.title}</h3>
                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Tag className="h-3 w-3" />
                                <span>{report.type}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{report.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{report.created}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={report.status === "Published" ? "default" : "outline"} className="font-subheader text-xs">
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-body mt-2">{report.description}</p>
                        <div className="flex justify-end mt-4 gap-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            View Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Report Templates and Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <FileText size={20} className="text-primary" />
                  Report Templates
                </CardTitle>
                <CardDescription>Ready-to-use report templates</CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  {reportTemplates.map((template, index) => (
                    <div key={index} className="p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{template.description}</p>
                      <Button variant="outline" size="sm" className="w-full text-xs">Use Template</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <Clock size={20} className="text-primary" />
                  Scheduled Reports
                </CardTitle>
                <CardDescription>Upcoming scheduled report generation</CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div className="p-3 bg-background/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">Weekly Security Summary</h3>
                      <Badge className="text-xs">Every Monday</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Summary of security events from the previous week.</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Next: May 13, 2025</span>
                      <span>Recipients: Security Team</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-background/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">Monthly Compliance Report</h3>
                      <Badge className="text-xs">Monthly</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Compliance status report for all regulatory frameworks.</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Next: June 1, 2025</span>
                      <span>Recipients: Compliance Team, Executive Team</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-background/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">Quarterly Threat Landscape</h3>
                      <Badge className="text-xs">Quarterly</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Comprehensive analysis of threat landscape and trends.</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Next: July 1, 2025</span>
                      <span>Recipients: All Security Teams, Executive Team</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Scheduled Reports
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}