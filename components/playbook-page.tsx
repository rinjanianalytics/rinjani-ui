"use client"

import { useState } from "react"
import SidebarMenu from "@/components/sidebar-menu"
import HeaderTop from "@/components/header-top"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, AlertCircle, Shield, Clock, CheckCircle, Filter, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PlaybookPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("incident")

  // Animation settings
  const animationStyle = {
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Sample playbook data
  const playbooks = [
    {
      id: "PB-001",
      title: "Ransomware Incident Response",
      category: "Incident Response",
      description: "Step-by-step guide for responding to ransomware incidents.",
      steps: 12,
      lastUpdated: "2025-05-02",
      status: "Active"
    },
    {
      id: "PB-002",
      title: "Phishing Attack Response",
      category: "Incident Response",
      description: "Procedures for handling phishing attacks and compromised accounts.",
      steps: 8,
      lastUpdated: "2025-04-28",
      status: "Active"
    },
    {
      id: "PB-003",
      title: "Data Breach Investigation",
      category: "Investigation",
      description: "Comprehensive guide for investigating potential data breaches.",
      steps: 15,
      lastUpdated: "2025-05-05",
      status: "Under Review"
    },
    {
      id: "PB-004",
      title: "Malware Analysis Procedure",
      category: "Analysis",
      description: "Procedures for safely analyzing malware samples.",
      steps: 10,
      lastUpdated: "2025-04-20",
      status: "Active"
    },
    {
      id: "PB-005",
      title: "DDoS Attack Mitigation",
      category: "Incident Response",
      description: "Steps to mitigate and recover from DDoS attacks.",
      steps: 9,
      lastUpdated: "2025-05-10",
      status: "Active"
    },
    {
      id: "PB-006",
      title: "Insider Threat Investigation",
      category: "Investigation",
      description: "Procedures for investigating potential insider threats.",
      steps: 14,
      lastUpdated: "2025-04-15",
      status: "Under Review"
    }
  ]

  // Recent incidents
  const recentIncidents = [
    {
      id: "INC-2025-042",
      title: "Suspicious Login Activity",
      severity: "Medium",
      status: "In Progress",
      assignee: "John Smith",
      created: "2025-05-08"
    },
    {
      id: "INC-2025-041",
      title: "Potential Data Exfiltration",
      severity: "High",
      status: "In Progress",
      assignee: "Sarah Johnson",
      created: "2025-05-07"
    },
    {
      id: "INC-2025-040",
      title: "Malware Detection",
      severity: "Medium",
      status: "Resolved",
      assignee: "Michael Chen",
      created: "2025-05-05"
    }
  ]

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Menu Component */}
      <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} animationStyle={animationStyle} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <HeaderTop toggleSidebar={toggleSidebar} title="Playbooks" />

        {/* Main Content */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text font-header mb-4 md:mb-0">SECURITY PLAYBOOKS</h1>
            <Tabs defaultValue="incident" className="w-auto" onValueChange={setActiveTab}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="incident" className="font-subheader text-xs">INCIDENT RESPONSE</TabsTrigger>
                <TabsTrigger value="investigation" className="font-subheader text-xs">INVESTIGATION</TabsTrigger>
                <TabsTrigger value="analysis" className="font-subheader text-xs">ANALYSIS</TabsTrigger>
                <TabsTrigger value="all" className="font-subheader text-xs">ALL</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input 
                placeholder="Search playbooks..." 
                className="pl-12 bg-card border-none rounded-xl h-14 shadow-sm"
              />
            </div>
            <Button variant="outline" className="h-14 px-4 flex items-center gap-2 bg-card border-none rounded-xl shadow-sm">
              <Filter size={18} />
              <span className="font-subheader">FILTERS</span>
            </Button>
            <Button className="h-14 px-4 flex items-center gap-2 rounded-xl">
              <FileText size={18} />
              <span className="font-subheader">NEW PLAYBOOK</span>
            </Button>
          </div>

          {/* Playbook Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">TOTAL PLAYBOOKS</p>
                  <p className="text-3xl font-bold font-header mt-1">24</p>
                  <p className="text-xs text-muted-foreground mt-1">+3 new this month</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">ACTIVE INCIDENTS</p>
                  <p className="text-3xl font-bold font-header mt-1">7</p>
                  <p className="text-xs text-muted-foreground mt-1">+2 from last week</p>
                </div>
                <div className="p-3 bg-red-100/50 dark:bg-red-900/20 rounded-full">
                  <AlertCircle className="h-6 w-6 text-red-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">MEAN TIME TO RESOLVE</p>
                  <p className="text-3xl font-bold font-header mt-1">4.2h</p>
                  <p className="text-xs text-muted-foreground mt-1">-15% from last month</p>
                </div>
                <div className="p-3 bg-amber-100/50 dark:bg-amber-900/20 rounded-full">
                  <Clock className="h-6 w-6 text-amber-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">RESOLVED INCIDENTS</p>
                  <p className="text-3xl font-bold font-header mt-1">42</p>
                  <p className="text-xs text-muted-foreground mt-1">This quarter</p>
                </div>
                <div className="p-3 bg-green-100/50 dark:bg-green-900/20 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-500/60" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Playbooks Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-bold gradient-text mb-4 font-header">AVAILABLE PLAYBOOKS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playbooks.map((playbook) => (
                <Card key={playbook.id} className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="p-5 border-b bg-gradient-to-r from-primary/10 to-transparent">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium text-primary font-subheader">{playbook.category.toUpperCase()}</p>
                        <CardTitle className="text-base text-gray-900 dark:text-white font-header">{playbook.title}</CardTitle>
                      </div>
                      <Badge variant={playbook.status === "Active" ? "default" : "outline"} className="font-subheader text-xs">
                        {playbook.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-body">{playbook.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>{playbook.steps} steps</span>
                        <span>Updated: {playbook.lastUpdated}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0 flex justify-end">
                    <Button variant="outline" size="sm" className="text-xs font-subheader">
                      <FileText className="h-4 w-4 mr-2" />
                      VIEW PLAYBOOK
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                <CardHeader className="p-5 border-b">
                  <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                    <Shield size={20} className="text-primary" />
                    Recent Incidents
                  </CardTitle>
                  <CardDescription>Active and recently resolved security incidents</CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-4">
                    {recentIncidents.map((incident) => (
                      <div key={incident.id} className="p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">{incident.title}</h3>
                              <Badge variant={
                                incident.severity === "High" ? "destructive" : 
                                incident.severity === "Medium" ? "default" : 
                                "outline"
                              } className="text-xs">
                                {incident.severity}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500">ID: {incident.id} • Created: {incident.created}</p>
                          </div>
                          <Badge variant={
                            incident.status === "Resolved" ? "outline" : "secondary"
                          } className="text-xs">
                            {incident.status}
                          </Badge>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-gray-600 dark:text-gray-400">Assigned to: {incident.assignee}</span>
                          <Button variant="ghost" size="sm" className="h-8 text-xs">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <Download size={20} className="text-primary" />
                  Playbook Templates
                </CardTitle>
                <CardDescription>Ready-to-use security playbook templates</CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div className="p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Ransomware Response</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Standard template for ransomware incidents.</p>
                    <Button variant="outline" size="sm" className="w-full text-xs">Download Template</Button>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Phishing Investigation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Template for investigating phishing attempts.</p>
                    <Button variant="outline" size="sm" className="w-full text-xs">Download Template</Button>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Data Breach Response</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Comprehensive data breach response template.</p>
                    <Button variant="outline" size="sm" className="w-full text-xs">Download Template</Button>
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