"use client"

import { useState, useEffect } from "react"
import SidebarMenu from "@/components/sidebar-menu"
import HeaderTop from "@/components/header-top"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Bell, AlertTriangle, AlertCircle, Info, Shield } from "lucide-react"

export default function ThreatModellingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Animation style for sidebar transitions
  const animationStyle = {
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }

  // Toggle sidebar function
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Define types for threat modeling data
  interface ThreatModel {
    id: string
    title: string
    description: string
    severity: "high" | "medium" | "low"
    category: "application" | "infrastructure" | "data" | "network"
    status: "identified" | "analyzed" | "mitigated"
    assets: string[]
    threats: string[]
    vulnerabilities: string[]
    mitigations?: string[]
    timestamp: string
  }

  const [threatModels, setThreatModels] = useState<ThreatModel[]>([])

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockThreatModels = [
      {
        id: "tm1",
        title: "Web Application Authentication Bypass",
        description: "Potential authentication bypass in the login flow allowing unauthorized access to user accounts",
        severity: "high",
        category: "application",
        status: "analyzed",
        assets: ["User Authentication System", "User Database"],
        threats: ["Unauthorized Access", "Identity Theft", "Data Breach"],
        vulnerabilities: ["Improper Session Management", "Weak Password Policy"],
        mitigations: ["Implement MFA", "Enhance Session Validation", "Strengthen Password Requirements"],
        timestamp: "2025-05-09T14:30:00Z"
      },
      {
        id: "tm2",
        title: "Insecure API Endpoints",
        description: "Several API endpoints lack proper authorization checks, potentially exposing sensitive data",
        severity: "high",
        category: "application",
        status: "identified",
        assets: ["API Gateway", "Customer Data"],
        threats: ["Data Exposure", "Privilege Escalation"],
        vulnerabilities: ["Missing Authorization Checks", "Excessive Data Exposure"],
        timestamp: "2025-05-08T11:45:00Z"
      },
      {
        id: "tm3",
        title: "Database Encryption Gaps",
        description: "Certain database fields containing sensitive information are not properly encrypted at rest",
        severity: "medium",
        category: "data",
        status: "analyzed",
        assets: ["Customer Database", "Payment Information"],
        threats: ["Data Breach", "Regulatory Non-compliance"],
        vulnerabilities: ["Insufficient Encryption", "Sensitive Data Exposure"],
        mitigations: ["Implement Field-level Encryption", "Review Data Classification"],
        timestamp: "2025-05-07T16:20:00Z"
      },
      {
        id: "tm4",
        title: "Outdated Network Firewall Rules",
        description: "Firewall configuration contains outdated rules that may allow unauthorized network traffic",
        severity: "medium",
        category: "network",
        status: "mitigated",
        assets: ["Network Perimeter", "Internal Services"],
        threats: ["Unauthorized Access", "Network Intrusion"],
        vulnerabilities: ["Misconfigured Firewall", "Excessive Network Exposure"],
        mitigations: ["Firewall Rule Audit", "Implement Zero Trust Architecture", "Regular Configuration Reviews"],
        timestamp: "2025-05-06T09:15:00Z"
      },
      {
        id: "tm5",
        title: "Unpatched Server Vulnerabilities",
        description: "Production servers missing critical security patches for known vulnerabilities",
        severity: "high",
        category: "infrastructure",
        status: "identified",
        assets: ["Production Servers", "Application Services"],
        threats: ["Remote Code Execution", "Service Disruption"],
        vulnerabilities: ["Missing Security Patches", "Outdated Software"],
        timestamp: "2025-05-09T10:30:00Z"
      },
      {
        id: "tm6",
        title: "Insufficient Logging and Monitoring",
        description: "Security-relevant events are not adequately logged or monitored, hindering incident detection",
        severity: "low",
        category: "infrastructure",
        status: "analyzed",
        assets: ["Logging Infrastructure", "Security Monitoring"],
        threats: ["Delayed Incident Detection", "Insufficient Forensic Data"],
        vulnerabilities: ["Inadequate Logging", "Missing Alerting Mechanisms"],
        mitigations: ["Enhance Logging Strategy", "Implement SIEM Solution"],
        timestamp: "2025-05-08T13:40:00Z"
      },
      {
        id: "tm7",
        title: "Insecure File Upload Functionality",
        description: "File upload feature lacks proper validation, allowing potentially malicious files",
        severity: "medium",
        category: "application",
        status: "identified",
        assets: ["Document Management System", "Web Application"],
        threats: ["Malware Upload", "Server-side Attacks"],
        vulnerabilities: ["Insufficient File Validation", "Missing Content Scanning"],
        timestamp: "2025-05-07T15:10:00Z"
      }
    ] as ThreatModel[]
    
    setThreatModels(mockThreatModels)
  }, [])

  // Filter threat models based on active tab
  const filteredThreatModels = threatModels.filter(model => {
    if (activeTab === "all") return true
    if (activeTab === "high" || activeTab === "medium" || activeTab === "low") 
      return model.severity === activeTab
    if (activeTab === "application" || activeTab === "infrastructure" || activeTab === "data" || activeTab === "network") 
      return model.category === activeTab
    return false
  })

  // Function to format timestamp
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  // Function to get severity icon
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "low":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  // Function to get severity color class
  const getSeverityColorClass = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Function to get status color class
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "identified":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "analyzed":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "mitigated":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{
            transition: `opacity ${animationStyle.transitionDuration} ${animationStyle.transitionTimingFunction}`,
          }}
        />
      )}

      {/* Sidebar Menu Component */}
      <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} animationStyle={animationStyle} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <HeaderTop toggleSidebar={toggleSidebar} title="Threat Modelling" />

        {/* Main Content */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold gradient-text">Threat Modelling</h1>
            <Tabs defaultValue="all" className="w-auto" onValueChange={setActiveTab}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="all">All Models</TabsTrigger>
                <TabsTrigger value="high">High Risk</TabsTrigger>
                <TabsTrigger value="medium">Medium Risk</TabsTrigger>
                <TabsTrigger value="low">Low Risk</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Threat Modelling Summary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-card border-none rounded-xl">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Models</p>
                  <p className="text-2xl font-bold">{threatModels.length}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-none rounded-xl">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                  <p className="text-2xl font-bold">{threatModels.filter(t => t.severity === "high").length}</p>
                </div>
                <div className="p-2 bg-red-100 rounded-full dark:bg-red-900/30">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-none rounded-xl">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Medium Risk</p>
                  <p className="text-2xl font-bold">{threatModels.filter(t => t.severity === "medium").length}</p>
                </div>
                <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900/30">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-none rounded-xl">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Low Risk</p>
                  <p className="text-2xl font-bold">{threatModels.filter(t => t.severity === "low").length}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/30">
                  <Info className="h-5 w-5 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Filter Tabs */}
          <div className="mb-6">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="bg-secondary w-full justify-start">
                <TabsTrigger value="all">All Categories</TabsTrigger>
                <TabsTrigger value="application">Application</TabsTrigger>
                <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Threat Models List */}
          <Card className="bg-card border-none rounded-xl overflow-hidden">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg">Threat Models</CardTitle>
            </CardHeader>
            <div className="divide-y">
              {filteredThreatModels.length > 0 ? (
                filteredThreatModels.map((model) => (
                  <div key={model.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{getSeverityIcon(model.severity)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{model.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{formatDate(model.timestamp)}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColorClass(model.severity)}`}>
                              {model.severity}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{model.description}</p>
                        
                        <div className="mt-3 bg-secondary/30 p-3 rounded-md">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColorClass(model.status)}`}>
                              {model.status}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-secondary">
                              {model.category}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <span className="text-xs text-muted-foreground">Affected Assets:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {model.assets.map((asset, index) => (
                                  <span key={index} className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                                    {asset}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-xs text-muted-foreground">Threats:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {model.threats.map((threat, index) => (
                                  <span key={index} className="text-xs px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full">
                                    {threat}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-xs text-muted-foreground">Vulnerabilities:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {model.vulnerabilities.map((vulnerability, index) => (
                                  <span key={index} className="text-xs px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full">
                                    {vulnerability}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {model.mitigations && model.mitigations.length > 0 && (
                            <div className="mt-2">
                              <span className="text-xs text-muted-foreground">Mitigations:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {model.mitigations.map((mitigation, index) => (
                                  <span key={index} className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full">
                                    {mitigation}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Shield className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                  <p className="mt-2 text-muted-foreground">No threat models found in this category</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
