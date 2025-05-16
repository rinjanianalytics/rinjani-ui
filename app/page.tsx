"use client"

import { useState } from "react"
import Link from "next/link"
import { CircleAlert, ChevronUp, ChevronDown, Shield, Globe, Users, BarChart3, PieChart, AlertTriangle, FileWarning, Lock, Server } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SidebarMenu from "@/components/sidebar-menu"
import HeaderTop from "@/components/header-top"
import DonutChart from "@/components/donut-chart"
import WorldMapChart from "@/components/world-map-chart"
import GlobalCybersecurityNews from "./global-cybersecurity-news"

// Sample data
const severityData = [
  { value: 169, color: "hsl(var(--chart-3))" }, // Medium - Yellow/Orange
  { value: 120, color: "hsl(var(--destructive))" }, // High - Red
  { value: 177, color: "hsl(var(--primary))" }, // Low - Teal
]

const typeData = [
  { value: 222, color: "hsl(var(--chart-1))" }, // Exploitable Ports - Blue
  { value: 93, color: "hsl(var(--primary))" }, // Compromised - Teal
  { value: 151, color: "hsl(var(--chart-4))" }, // Other - Purple
]

// Sample data for threat actors
const threatActors = [
  { 
    name: "APT41", 
    country: "China", 
    activity: "High", 
    targets: ["Financial", "Healthcare", "Technology"],
    recentCampaigns: 3,
    lastSeen: "2 days ago"
  },
  { 
    name: "Lazarus Group", 
    country: "North Korea", 
    activity: "Medium", 
    targets: ["Financial", "Cryptocurrency", "Defense"],
    recentCampaigns: 2,
    lastSeen: "5 days ago"
  },
  { 
    name: "Sandworm", 
    country: "Russia", 
    activity: "High", 
    targets: ["Energy", "Government", "Critical Infrastructure"],
    recentCampaigns: 4,
    lastSeen: "1 day ago"
  },
  { 
    name: "FIN7", 
    country: "Unknown", 
    activity: "Medium", 
    targets: ["Retail", "Hospitality", "Financial"],
    recentCampaigns: 1,
    lastSeen: "8 days ago"
  }
]

// Sample data for world map
const threatLocationData = [
  { country: "United States", count: 245, lat: 37.0902, long: -95.7129 },
  { country: "Russia", count: 187, lat: 61.5240, long: 105.3188 },
  { country: "China", count: 156, lat: 35.8617, long: 104.1954 },
  { country: "Brazil", count: 98, lat: -14.2350, long: -51.9253 },
  { country: "India", count: 87, lat: 20.5937, long: 78.9629 },
]

// Sample data for security score
const securityScores = [
  { category: "Network", score: 65, maxScore: 100 },
  { category: "Endpoint", score: 85, maxScore: 100 },
  { category: "Cloud", score: 55, maxScore: 100 },
  { category: "Application", score: 70, maxScore: 100 },
]

// Sample data for global cybersecurity news threats
const globalThreats = [
  {
    id: "CVE-2023-23397",
    title: "Critical Microsoft Exchange Vulnerability",
    description: "Remote code execution vulnerability affecting Exchange Server. Actively exploited in the wild.",
    severity: "Critical",
    cvssScore: 9.8,
    affectedSystems: ["Mail Servers", "Directory Services"],
    relevance: "High",
    date: "2025-05-08",
    category: "CVE",
    icon: Server,
    impactAreas: ["Network", "Application"]
  },
  {
    id: "THREAT-2025-0142",
    title: "New Ransomware Targeting Healthcare",
    description: "Sophisticated ransomware campaign specifically targeting healthcare organizations through phishing attacks.",
    severity: "High",
    affectedSystems: ["Healthcare Systems", "Patient Records"],
    relevance: "Medium",
    date: "2025-05-07",
    category: "Ransomware",
    icon: Lock,
    impactAreas: ["Endpoint", "Application"]
  },
  {
    id: "VULN-2025-0089",
    title: "Cloud Service Provider Zero-Day",
    description: "Zero-day vulnerability in major cloud service provider allowing privilege escalation.",
    severity: "Critical",
    affectedSystems: ["Cloud Infrastructure", "Kubernetes Clusters"],
    relevance: "High",
    date: "2025-05-09",
    category: "Zero-Day",
    icon: Globe,
    impactAreas: ["Cloud"]
  },
  {
    id: "THREAT-2025-0156",
    title: "Supply Chain Attack on Software Vendors",
    description: "Sophisticated supply chain attack targeting software development pipelines.",
    severity: "High",
    affectedSystems: ["CI/CD Pipelines", "Software Repositories"],
    relevance: "Medium",
    date: "2025-05-06",
    category: "Supply Chain",
    icon: FileWarning,
    impactAreas: ["Application", "Cloud"]
  }
]

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("week")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedThreatActor, setSelectedThreatActor] = useState(0)

  // Animation settings
  const animationStyle = {
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Center content for donut charts
  const severityCenterContent = (
    <div className="flex flex-col items-center justify-center">
      <span className="text-2xl font-bold">169</span>
      <span className="text-xs text-muted-foreground">Medium</span>
    </div>
  )

  const typeCenterContent = (
    <div className="flex flex-col items-center justify-center">
      <span className="text-2xl font-bold">222</span>
      <span className="text-xs text-muted-foreground">Exploitable</span>
      <span className="text-xs text-muted-foreground">Ports</span>
    </div>
  )

  // Calculate overall security score
  const overallScore = Math.round(
    securityScores.reduce((sum, item) => sum + item.score, 0) / securityScores.length
  )

  // Get color based on score
  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  // Get soft background color based on severity
  const getSeverityBgColor = (severity: string): string => {
    switch (severity) {
      case "Critical":
        return "bg-red-100/50 dark:bg-red-900/20"
      case "High":
        return "bg-amber-100/50 dark:bg-amber-900/20"
      case "Medium":
        return "bg-yellow-100/50 dark:bg-yellow-900/20"
      default:
        return "bg-blue-100/50 dark:bg-blue-900/20"
    }
  }

  // Get soft text color based on severity
  const getSeverityTextColor = (severity: string): string => {
    switch (severity) {
      case "Critical":
        return "text-red-500/60"
      case "High":
        return "text-amber-500/60"
      case "Medium":
        return "text-yellow-500/60"
      default:
        return "text-blue-500/60"
    }
  }

  // Get soft background color based on relevance
  const getRelevanceBgColor = (relevance: string): string => {
    switch (relevance) {
      case "High":
        return "bg-purple-100/50 dark:bg-purple-900/20"
      case "Medium":
        return "bg-blue-100/50 dark:bg-blue-900/20"
      default:
        return "bg-gray-100/50 dark:bg-gray-900/20"
    }
  }

  // Get soft text color based on relevance
  const getRelevanceTextColor = (relevance: string): string => {
    switch (relevance) {
      case "High":
        return "text-purple-500/60"
      case "Medium":
        return "text-blue-500/60"
      default:
        return "text-gray-500/60"
    }
  }

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // Check if a threat is relevant to the organization based on security posture
  const isRelevantThreat = (threat: typeof globalThreats[0]): boolean => {
    // Check if any of the threat's impact areas match areas where the organization has a low score
    return threat.impactAreas.some(area => {
      const score = securityScores.find(s => s.category === area)?.score || 100
      return score < 70 // Consider relevant if score is below 70
    })
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Menu Component */}
      <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} animationStyle={animationStyle} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <HeaderTop toggleSidebar={toggleSidebar} title="Main Dashboard" />

        {/* Main Dashboard */}
        <div className="p-6 flex-1 overflow-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text font-header mb-4 md:mb-0">ALERTS DASHBOARD</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 bg-card p-2 rounded-lg shadow-sm">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 font-subheader">EXCLUDE CUSTOMIZED</span>
                <Switch />
              </div>
              <div className="flex items-center gap-2 bg-card p-2 rounded-lg shadow-sm">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 font-subheader">SEVERITY</span>
                <div className="w-40 h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-primary rounded-full">
                  <div className="relative">
                    <div className="absolute -top-1 right-4 w-6 h-6 bg-background rounded-full border-2 border-primary shadow-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-none rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">ACTIVE ALERTS</p>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-3xl font-bold font-header">466</p>
                    <ChevronUp className="text-primary" size={18} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+12% from last week</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <CircleAlert className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">OPEN ALERTS</p>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-3xl font-bold font-header">28</p>
                    <ChevronUp className="text-primary" size={18} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+5% from last week</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <CircleAlert className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">ACKNOWLEDGED</p>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-3xl font-bold font-header">438</p>
                    <ChevronUp className="text-primary" size={18} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+8% from last week</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <CircleAlert className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">MEAN TIME TO ACK</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-2xl font-bold font-header">7</span>
                    <span className="text-muted-foreground">d</span>
                    <span className="text-2xl font-bold font-header ml-1">4</span>
                    <span className="text-muted-foreground">h</span>
                    <span className="text-2xl font-bold font-header ml-1">28</span>
                    <span className="text-muted-foreground">m</span>
                    <ChevronDown className="text-primary ml-1" size={18} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">-3% from last week</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <CircleAlert className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Alerts and New Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-6">
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="p-5 border-b">
                  <CardTitle className="text-lg font-header">ACTIVE ALERTS BREAKDOWN</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* By Severity Chart */}
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground mb-3 font-subheader">BY SEVERITY</h4>
                      <div className="flex items-center justify-center">
                        <DonutChart data={severityData} size={140} thickness={28} centerContent={severityCenterContent} />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary))]"></div>
                            <span className="text-xs ml-2">Low</span>
                          </div>
                          <span className="text-xs font-medium">177</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-3))]"></div>
                            <span className="text-xs ml-2">Medium</span>
                          </div>
                          <span className="text-xs font-medium">169</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[hsl(var(--destructive))]"></div>
                            <span className="text-xs ml-2">High</span>
                          </div>
                          <span className="text-xs font-medium">120</span>
                        </div>
                      </div>
                    </div>

                    {/* By Type Chart */}
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground mb-3 font-subheader">BY TYPE</h4>
                      <div className="flex items-center justify-center">
                        <DonutChart data={typeData} size={140} thickness={28} centerContent={typeCenterContent} />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]"></div>
                            <span className="text-xs ml-2">Exploitable Ports</span>
                          </div>
                          <span className="text-xs font-medium">222</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary))]"></div>
                            <span className="text-xs ml-2">Compromised</span>
                          </div>
                          <span className="text-xs font-medium">93</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-4))]"></div>
                            <span className="text-xs ml-2">Other</span>
                          </div>
                          <span className="text-xs font-medium">151</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-6">
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="p-5 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-header">NEW ALERTS TREND</CardTitle>
                    <Tabs defaultValue="week" className="w-auto" onValueChange={setSelectedTab}>
                      <TabsList className="bg-secondary">
                        <TabsTrigger value="week" className={`font-subheader text-xs ${selectedTab === "week" ? "bg-accent" : ""}`}>
                          WEEK
                        </TabsTrigger>
                        <TabsTrigger value="month" className={`font-subheader text-xs ${selectedTab === "month" ? "bg-accent" : ""}`}>
                          MONTH
                        </TabsTrigger>
                        <TabsTrigger value="3month" className={`font-subheader text-xs ${selectedTab === "3month" ? "bg-accent" : ""}`}>
                          3 MONTH
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-bold font-header">58</span>
                    <ChevronUp className="text-primary" size={18} />
                    <span className="text-xs text-primary ml-1">+14%</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Chart */}
                    <div className="h-48 relative bg-background/50 p-4 rounded-lg">
                      <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                        <path
                          d="M0,150 C50,120 100,140 150,100 C200,60 250,80 300,20 C350,40 400,10 500,80"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="3"
                        />
                        <path
                          d="M0,150 C50,120 100,140 150,100 C200,60 250,80 300,20 C350,40 400,10 500,80"
                          fill="hsl(var(--primary) / 0.2)"
                          fillOpacity="0.2"
                          stroke="none"
                        />
                      </svg>
                      
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-2">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>

                    {/* Recent Alerts Table */}
                    <div className="bg-background/50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2 font-subheader">RECENT ALERTS</h4>
                      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                        {[
                          { id: "A-2025-0089", type: "Network", time: "10:45 AM", severity: "High" },
                          { id: "A-2025-0088", type: "Endpoint", time: "09:32 AM", severity: "Medium" },
                          { id: "A-2025-0087", type: "Cloud", time: "08:15 AM", severity: "Critical" },
                          { id: "A-2025-0086", type: "Application", time: "Yesterday", severity: "Low" },
                          { id: "A-2025-0085", type: "Network", time: "Yesterday", severity: "Medium" },
                        ].map((alert, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs p-1.5 border-b border-border last:border-0">
                            <div className="font-medium">{alert.id}</div>
                            <div className="text-muted-foreground">{alert.type}</div>
                            <div className="text-muted-foreground">{alert.time}</div>
                            <div className={`px-1.5 py-0.5 rounded-sm text-xs ${
                              alert.severity === "Critical" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                              alert.severity === "High" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" :
                              alert.severity === "Medium" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" :
                              "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}>
                              {alert.severity}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Threat Actor Activities Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white gradient-text font-header">THREAT ACTOR ACTIVITIES</h1>
          </div>

          {/* Threat Actor Activities Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Threat Actors Table */}
            <Card className="bg-card border-none rounded-xl overflow-hidden lg:col-span-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg font-header">ACTIVE THREAT ACTORS</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-subheader text-muted-foreground">ACTOR</th>
                        <th className="text-left py-2 px-3 font-subheader text-muted-foreground">COUNTRY</th>
                        <th className="text-left py-2 px-3 font-subheader text-muted-foreground">ACTIVITY</th>
                        <th className="text-left py-2 px-3 font-subheader text-muted-foreground">LAST SEEN</th>
                        <th className="text-left py-2 px-3 font-subheader text-muted-foreground">CAMPAIGNS</th>
                        <th className="text-left py-2 px-3 font-subheader text-muted-foreground">PRIMARY TARGETS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {threatActors.map((actor, index) => (
                        <tr key={index} className="border-b border-border last:border-0 hover:bg-background/50">
                          <td className="py-3 px-3 font-medium">
                            <div className="flex items-center gap-2">
                              <Users className={`h-4 w-4 ${
                                actor.activity === "High"
                                  ? "text-red-600 dark:text-red-500"
                                  : "text-amber-600 dark:text-amber-500"
                              }`} />
                              {actor.name}
                            </div>
                          </td>
                          <td className="py-3 px-3">{actor.country}</td>
                          <td className="py-3 px-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                              actor.activity === "High"
                                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}>
                              {actor.activity}
                            </span>
                          </td>
                          <td className="py-3 px-3">{actor.lastSeen}</td>
                          <td className="py-3 px-3 text-center">{actor.recentCampaigns}</td>
                          <td className="py-3 px-3">
                            <div className="flex flex-wrap gap-1">
                              {actor.targets.map((target, idx) => (
                                <span key={idx} className="text-xs px-1.5 py-0.5 bg-background text-gray-800 dark:text-gray-200 rounded-sm border border-gray-200 dark:border-gray-700">
                                  {target}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Threat Actor Stats */}
            <Card className="bg-card border-none rounded-xl overflow-hidden lg:col-span-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg font-header">THREAT ACTOR STATS</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  {/* Activity Level Distribution */}
                  <div className="bg-background/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 font-subheader">ACTIVITY LEVEL</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: "60%" }}></div>
                      </div>
                      <span className="text-xs font-medium">High (60%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: "40%" }}></div>
                      </div>
                      <span className="text-xs font-medium">Medium (40%)</span>
                    </div>
                  </div>

                  {/* Geographic Distribution */}
                  <div className="bg-background/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 font-subheader">GEOGRAPHIC ORIGIN</h4>
                    <div className="space-y-2">
                      {[
                        { country: "China", percentage: 35 },
                        { country: "Russia", percentage: 30 },
                        { country: "North Korea", percentage: 20 },
                        { country: "Iran", percentage: 10 },
                        { country: "Unknown", percentage: 5 }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-xs font-medium">{item.country}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-semibold">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cyber Security Landscape Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white gradient-text font-header">CYBER SECURITY LANDSCAPE</h1>
          </div>

          {/* Threat Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* World Map */}
            <Card className="bg-card border-none rounded-xl overflow-hidden lg:col-span-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <Globe size={20} className="text-primary" />
                  <Link href="/threat-graph" className="hover:underline flex items-center gap-1">
                    Global Threat Distribution
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <div className="h-[220px] w-full bg-background/50 p-3 rounded-lg">
                      <WorldMapChart threatData={threatLocationData} width={500} height={220} />
                    </div>
                  </div>
                  <div className="bg-background/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 font-subheader">TOP THREAT LOCATIONS</h4>
                    <div className="space-y-2">
                      {threatLocationData.map((location, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs p-1.5 border-b border-border last:border-0">
                          <div className="font-medium">{location.country}</div>
                          <div className="flex items-center gap-1">
                            <span className="text-primary font-semibold">{location.count}</span>
                            <span className="text-xs text-muted-foreground">threats</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Score */}
            <Card className="bg-card border-none rounded-xl overflow-hidden lg:col-span-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <Shield size={20} className="text-primary" />
                  <Link href="/settings" className="hover:underline flex items-center gap-1">
                    Security Posture
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Overall Score */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-28 h-28 flex items-center justify-center bg-background/50 p-2 rounded-full">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="hsl(var(--muted))"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={`hsl(var(${overallScore >= 80 ? '--primary' : overallScore >= 60 ? '--chart-3' : '--destructive'}))`}
                          strokeWidth="10"
                          strokeDasharray={`${2 * Math.PI * 45 * (overallScore / 100)} ${2 * Math.PI * 45 * (1 - overallScore / 100)}`}
                          strokeDashoffset={2 * Math.PI * 45 * 0.25}
                          transform="rotate(-90 50 50)"
                        />
                        <text
                          x="50"
                          y="50"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="24"
                          fontWeight="bold"
                          fill="currentColor"
                        >
                          {overallScore}
                        </text>
                      </svg>
                    </div>
                    <div className="mt-2 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground font-subheader">OVERALL SCORE</h4>
                      <p className={`text-sm font-semibold ${getScoreColor(overallScore)}`}>
                        {overallScore >= 80 ? "Good" : overallScore >= 60 ? "Average" : "Poor"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Category Scores */}
                  <div className="md:col-span-2 bg-background/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 font-subheader">SECURITY CATEGORIES</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        {securityScores.slice(0, 2).map((item, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-gray-800 dark:text-gray-200 font-subheader">{item.category.toUpperCase()}</span>
                              <span className={`font-semibold ${getScoreColor(item.score)}`}>{item.score}</span>
                            </div>
                            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${(item.score / item.maxScore) * 100}%`,
                                  backgroundColor: `hsl(var(${
                                    item.score >= 80 ? '--primary' :
                                    item.score >= 60 ? '--chart-3' :
                                    '--destructive'
                                  }))`
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {securityScores.slice(2, 4).map((item, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-gray-800 dark:text-gray-200 font-subheader">{item.category.toUpperCase()}</span>
                              <span className={`font-semibold ${getScoreColor(item.score)}`}>{item.score}</span>
                            </div>
                            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${(item.score / item.maxScore) * 100}%`,
                                  backgroundColor: `hsl(var(${
                                    item.score >= 80 ? '--primary' :
                                    item.score >= 60 ? '--chart-3' :
                                    '--destructive'
                                  }))`
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Recommendations */}
                    <div className="mt-4 pt-3 border-t border-border">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2 font-subheader">RECOMMENDATIONS</h4>
                      <div className="text-xs text-muted-foreground">
                        <p className="mb-1">• Improve Cloud security posture (55/100)</p>
                        <p className="mb-1">• Enhance Network security monitoring</p>
                        <p>• Update Application security policies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Cyber Security Landscape Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Threat Trends */}
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <BarChart3 size={20} className="text-primary" />
                  Threat Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 font-subheader">THREAT CATEGORIES</h4>
                    <div className="space-y-3">
                      {[
                        { category: "Malware", count: 156, change: "+12%" },
                        { category: "Phishing", count: 98, change: "+8%" },
                        { category: "Ransomware", count: 67, change: "+23%" },
                        { category: "DDoS", count: 42, change: "-5%" },
                        { category: "Zero-day", count: 18, change: "+15%" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-xs font-medium">{item.category}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${(item.count / 156) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-semibold">{item.count}</span>
                            <span className={`text-xs ${item.change.startsWith('+') ? 'text-primary' : 'text-destructive'}`}>
                              {item.change}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-background/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 font-subheader">MONTHLY TREND</h4>
                    <div className="h-[160px] relative">
                      <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <path
                          d="M0,80 C25,70 50,90 75,60 C100,30 125,50 150,20 C175,40 200,10 225,30 C250,50 275,40 300,60"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                        />
                        <path
                          d="M0,80 C25,70 50,90 75,60 C100,30 125,50 150,20 C175,40 200,10 225,30 C250,50 275,40 300,60 L300,100 L0,100 Z"
                          fill="hsl(var(--primary) / 0.1)"
                          stroke="none"
                        />
                      </svg>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Industry Vulnerabilities */}
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <PieChart size={20} className="text-primary" />
                  <Link href="/knowledge-base" className="hover:underline flex items-center gap-1">
                    Industry Vulnerabilities
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 font-subheader">VULNERABLE INDUSTRIES</h4>
                    <div className="space-y-3">
                      {[
                        { industry: "Healthcare", risk: 85, color: "bg-red-500" },
                        { industry: "Financial", risk: 78, color: "bg-amber-500" },
                        { industry: "Energy", risk: 72, color: "bg-yellow-500" },
                        { industry: "Government", risk: 68, color: "bg-blue-500" },
                        { industry: "Technology", risk: 65, color: "bg-primary" }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">{item.industry}</span>
                            <span className="text-xs font-semibold">{item.risk}%</span>
                          </div>
                          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className={`h-full ${item.color} rounded-full`}
                              style={{ width: `${item.risk}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-background/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 font-subheader">TOP VULNERABILITIES</h4>
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {[
                        { id: "CVE-2025-1234", severity: "Critical", affected: "Multiple" },
                        { id: "CVE-2025-5678", severity: "High", affected: "Windows" },
                        { id: "CVE-2025-9012", severity: "Critical", affected: "Linux" },
                        { id: "CVE-2025-3456", severity: "Medium", affected: "Cloud" },
                        { id: "CVE-2025-7890", severity: "High", affected: "IoT" },
                        { id: "CVE-2025-2345", severity: "Medium", affected: "Mobile" }
                      ].map((vuln, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs p-1.5 border-b border-border last:border-0">
                          <div className="font-medium">{vuln.id}</div>
                          <div className={`px-1.5 py-0.5 rounded-sm text-xs ${
                            vuln.severity === "Critical" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                            vuln.severity === "High" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" :
                            "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}>
                            {vuln.severity}
                          </div>
                          <div className="text-muted-foreground">{vuln.affected}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Global Cybersecurity News */}
          <GlobalCybersecurityNews securityScores={securityScores} />
        </div>
      </div>
    </div>
  )
}
