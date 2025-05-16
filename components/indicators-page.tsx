"use client"

import { useState } from "react"
import SidebarMenu from "@/components/sidebar-menu"
import HeaderTop from "@/components/header-top"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, BarChart2, Hash, Globe, Server, Database, FileCode, Copy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function IndicatorsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Animation settings
  const animationStyle = {
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Sample indicators data
  const indicators = [
    {
      id: "IOC-001",
      type: "IP Address",
      value: "192.168.1.254",
      confidence: "High",
      source: "Threat Intelligence",
      description: "Command and control server for APT group",
      dateAdded: "2025-05-10",
      tags: ["APT", "C2", "Malware"]
    },
    {
      id: "IOC-002",
      type: "Domain",
      value: "malicious-domain.com",
      confidence: "High",
      source: "Internal Analysis",
      description: "Phishing campaign domain",
      dateAdded: "2025-05-08",
      tags: ["Phishing", "Campaign"]
    },
    {
      id: "IOC-003",
      type: "File Hash",
      value: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
      confidence: "Medium",
      source: "OSINT",
      description: "Ransomware payload hash",
      dateAdded: "2025-05-05",
      tags: ["Ransomware", "Malware"]
    },
    {
      id: "IOC-004",
      type: "URL",
      value: "https://malicious-site.com/payload",
      confidence: "Medium",
      source: "Threat Intelligence",
      description: "Malware distribution URL",
      dateAdded: "2025-05-03",
      tags: ["Malware", "Distribution"]
    },
    {
      id: "IOC-005",
      type: "Email",
      value: "phishing@malicious-domain.com",
      confidence: "High",
      source: "Internal Analysis",
      description: "Sender email for phishing campaign",
      dateAdded: "2025-05-01",
      tags: ["Phishing", "Campaign"]
    },
    {
      id: "IOC-006",
      type: "File Hash",
      value: "q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2",
      confidence: "High",
      source: "OSINT",
      description: "Backdoor malware hash",
      dateAdded: "2025-04-28",
      tags: ["Backdoor", "Malware", "APT"]
    }
  ]

  // Indicator type counts
  const typeCounts = {
    "IP Address": 42,
    "Domain": 78,
    "File Hash": 156,
    "URL": 93,
    "Email": 64,
    "Registry": 31
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Menu Component */}
      <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} animationStyle={animationStyle} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <HeaderTop toggleSidebar={toggleSidebar} title="Indicators" />

        {/* Main Content */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text font-header mb-4 md:mb-0">THREAT INDICATORS</h1>
            <Tabs defaultValue="all" className="w-auto" onValueChange={setActiveTab}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="all" className="font-subheader text-xs">ALL</TabsTrigger>
                <TabsTrigger value="ip" className="font-subheader text-xs">IP/DOMAIN</TabsTrigger>
                <TabsTrigger value="hash" className="font-subheader text-xs">FILE HASH</TabsTrigger>
                <TabsTrigger value="other" className="font-subheader text-xs">OTHER</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input 
                placeholder="Search indicators..." 
                className="pl-12 bg-card border-none rounded-xl h-14 shadow-sm"
              />
            </div>
            <Button variant="outline" className="h-14 px-4 flex items-center gap-2 bg-card border-none rounded-xl shadow-sm">
              <Filter size={18} />
              <span className="font-subheader">FILTERS</span>
            </Button>
            <Button className="h-14 px-4 flex items-center gap-2 rounded-xl">
              <Download size={18} />
              <span className="font-subheader">EXPORT</span>
            </Button>
          </div>

          {/* Indicator Type Stats */}
          <div className="mb-8">
            <h2 className="text-xl font-bold gradient-text mb-4 font-header">INDICATOR TYPES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100/50 dark:bg-blue-900/20 rounded-full">
                      <Globe className="h-6 w-6 text-blue-500/60" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground font-subheader">IP/DOMAIN</p>
                      <p className="text-2xl font-bold font-header mt-1">{typeCounts["IP Address"] + typeCounts["Domain"]}</p>
                    </div>
                  </div>
                  <BarChart2 className="h-16 w-16 text-blue-500/20" />
                </CardContent>
              </Card>
              
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100/50 dark:bg-purple-900/20 rounded-full">
                      <Hash className="h-6 w-6 text-purple-500/60" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground font-subheader">FILE HASH</p>
                      <p className="text-2xl font-bold font-header mt-1">{typeCounts["File Hash"]}</p>
                    </div>
                  </div>
                  <BarChart2 className="h-16 w-16 text-purple-500/20" />
                </CardContent>
              </Card>
              
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-100/50 dark:bg-amber-900/20 rounded-full">
                      <Server className="h-6 w-6 text-amber-500/60" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground font-subheader">URL</p>
                      <p className="text-2xl font-bold font-header mt-1">{typeCounts["URL"]}</p>
                    </div>
                  </div>
                  <BarChart2 className="h-16 w-16 text-amber-500/20" />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Indicators Table */}
          <div className="mb-8">
            <h2 className="text-xl font-bold gradient-text mb-4 font-header">RECENT INDICATORS</h2>
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-xs font-subheader text-muted-foreground">ID</th>
                        <th className="text-left p-3 text-xs font-subheader text-muted-foreground">TYPE</th>
                        <th className="text-left p-3 text-xs font-subheader text-muted-foreground">VALUE</th>
                        <th className="text-left p-3 text-xs font-subheader text-muted-foreground">CONFIDENCE</th>
                        <th className="text-left p-3 text-xs font-subheader text-muted-foreground">SOURCE</th>
                        <th className="text-left p-3 text-xs font-subheader text-muted-foreground">DATE ADDED</th>
                        <th className="text-left p-3 text-xs font-subheader text-muted-foreground">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {indicators.map((indicator) => (
                        <tr key={indicator.id} className="border-b border-border hover:bg-background/50 transition-colors">
                          <td className="p-3 text-sm">{indicator.id}</td>
                          <td className="p-3 text-sm">
                            <Badge variant="outline" className="font-subheader text-xs">
                              {indicator.type}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm font-mono">
                            <div className="flex items-center gap-1">
                              {indicator.value}
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                          <td className="p-3 text-sm">
                            <Badge variant={
                              indicator.confidence === "High" ? "default" : 
                              indicator.confidence === "Medium" ? "secondary" : 
                              "outline"
                            } className="font-subheader text-xs">
                              {indicator.confidence}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm">{indicator.source}</td>
                          <td className="p-3 text-sm">{indicator.dateAdded}</td>
                          <td className="p-3 text-sm">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-8 text-xs">View</Button>
                              <Button variant="ghost" size="sm" className="h-8 text-xs">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <Database size={20} className="text-primary" />
                  Indicator Sources
                </CardTitle>
                <CardDescription>Distribution of indicators by source</CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Threat Intelligence</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: "42%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Internal Analysis</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: "28%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">OSINT</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: "18%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Partner Sharing</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: "12%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <FileCode size={20} className="text-primary" />
                  Indicator Feeds
                </CardTitle>
                <CardDescription>Available threat intelligence feeds</CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div className="p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">AlienVault OTX</h3>
                      <Badge variant="outline" className="text-xs">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Open Threat Exchange indicators.</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Last update: 10 minutes ago</span>
                      <span>5,234 indicators</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">MISP Feed</h3>
                      <Badge variant="outline" className="text-xs">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Malware Information Sharing Platform feed.</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Last update: 25 minutes ago</span>
                      <span>3,782 indicators</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">Custom Feed</h3>
                      <Badge variant="outline" className="text-xs">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Internal threat intelligence feed.</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Last update: 1 hour ago</span>
                      <span>1,245 indicators</span>
                    </div>
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