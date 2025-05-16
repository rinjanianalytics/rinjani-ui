"use client"

import { useState } from "react"
import SidebarMenu from "@/components/sidebar-menu"
import HeaderTop from "@/components/header-top"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Lock, AlertTriangle, CheckCircle, Server, Database, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function SecurityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Animation settings
  const animationStyle = {
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Sample security posture data
  const securityScores = [
    { category: "Network Security", score: 78, maxScore: 100 },
    { category: "Endpoint Security", score: 85, maxScore: 100 },
    { category: "Cloud Security", score: 62, maxScore: 100 },
    { category: "Application Security", score: 71, maxScore: 100 },
    { category: "Data Security", score: 80, maxScore: 100 },
    { category: "Identity & Access", score: 75, maxScore: 100 },
  ]

  // Calculate overall security score
  const overallScore = Math.round(
    securityScores.reduce((sum, item) => sum + item.score, 0) / securityScores.length
  )

  // Sample vulnerabilities data
  const vulnerabilities = [
    {
      id: "VULN-2025-001",
      title: "Outdated SSL Certificates",
      severity: "Medium",
      status: "Open",
      system: "Web Servers",
      discovered: "2025-05-05",
      description: "Multiple web servers have SSL certificates that will expire within 30 days."
    },
    {
      id: "VULN-2025-002",
      title: "Unpatched Operating Systems",
      severity: "High",
      status: "In Progress",
      system: "Workstations",
      discovered: "2025-05-03",
      description: "Several workstations are missing critical security patches released in the last 30 days."
    },
    {
      id: "VULN-2025-003",
      title: "Weak Password Policies",
      severity: "Medium",
      status: "Open",
      system: "Identity Management",
      discovered: "2025-05-01",
      description: "Password policies do not enforce sufficient complexity requirements."
    },
    {
      id: "VULN-2025-004",
      title: "Insecure API Endpoints",
      severity: "High",
      status: "Open",
      system: "Customer Portal",
      discovered: "2025-04-28",
      description: "Several API endpoints lack proper authentication and rate limiting."
    }
  ]

  // Sample compliance data
  const complianceFrameworks = [
    { name: "ISO 27001", compliance: 92, status: "Compliant" },
    { name: "NIST CSF", compliance: 87, status: "Compliant" },
    { name: "GDPR", compliance: 95, status: "Compliant" },
    { name: "PCI DSS", compliance: 78, status: "Partial" },
    { name: "HIPAA", compliance: 90, status: "Compliant" }
  ]

  // Get color based on score
  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  // Get background color based on score
  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Menu Component */}
      <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} animationStyle={animationStyle} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <HeaderTop toggleSidebar={toggleSidebar} title="Security" />

        {/* Main Content */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text font-header mb-4 md:mb-0">SECURITY POSTURE</h1>
            <Tabs defaultValue="overview" className="w-auto" onValueChange={setActiveTab}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="overview" className="font-subheader text-xs">OVERVIEW</TabsTrigger>
                <TabsTrigger value="vulnerabilities" className="font-subheader text-xs">VULNERABILITIES</TabsTrigger>
                <TabsTrigger value="compliance" className="font-subheader text-xs">COMPLIANCE</TabsTrigger>
                <TabsTrigger value="controls" className="font-subheader text-xs">CONTROLS</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Security Score Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 lg:col-span-2">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <Shield size={20} className="text-primary" />
                  Overall Security Score
                </CardTitle>
                <CardDescription>Aggregate security posture assessment</CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="relative w-32 h-32 flex items-center justify-center bg-background/50 p-2 rounded-full">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="10"
                      />
                      {/* Progress circle */}
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
                        className="font-header"
                      >
                        {overallScore}
                      </text>
                    </svg>
                  </div>
                  <div className="flex-1 ml-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Overall Rating</span>
                          <span className={`text-sm font-bold ${getScoreColor(overallScore)}`}>
                            {overallScore >= 80 ? "Good" : overallScore >= 60 ? "Fair" : "Poor"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {overallScore >= 80 
                            ? "Your security posture is strong, but continuous improvement is recommended." 
                            : overallScore >= 60 
                              ? "Your security posture needs attention in several areas." 
                              : "Your security posture requires immediate attention."}
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Last Assessment</span>
                          <span className="text-sm">2025-05-10</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Next Assessment</span>
                          <span className="text-sm">2025-06-10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">VULNERABILITIES</p>
                  <p className="text-3xl font-bold font-header mt-1">24</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="destructive" className="text-xs">8 High</Badge>
                    <Badge variant="outline" className="text-xs">16 Medium</Badge>
                  </div>
                </div>
                <div className="p-3 bg-red-100/50 dark:bg-red-900/20 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">COMPLIANCE</p>
                  <p className="text-3xl font-bold font-header mt-1">88%</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="default" className="text-xs">4/5 Frameworks</Badge>
                  </div>
                </div>
                <div className="p-3 bg-green-100/50 dark:bg-green-900/20 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-500/60" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-bold gradient-text mb-4 font-header">SECURITY CATEGORIES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityScores.map((category, index) => (
                <Card key={index} className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="p-5 border-b">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base text-gray-900 dark:text-white font-header">{category.category}</CardTitle>
                      <Badge variant={
                        category.score >= 80 ? "default" : 
                        category.score >= 60 ? "secondary" : 
                        "destructive"
                      } className="font-subheader text-xs">
                        {category.score}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <Progress value={category.score} className="h-2" />
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Vulnerabilities and Compliance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                    <AlertTriangle size={20} className="text-primary" />
                    Recent Vulnerabilities
                  </CardTitle>
                  <Button variant="outline" size="sm" className="text-xs">View All</Button>
                </div>
                <CardDescription>Recently discovered security vulnerabilities</CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  {vulnerabilities.map((vuln) => (
                    <div key={vuln.id} className="p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">{vuln.title}</h3>
                            <Badge variant={
                              vuln.severity === "High" ? "destructive" : 
                              vuln.severity === "Medium" ? "default" : 
                              "outline"
                            } className="text-xs">
                              {vuln.severity}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">ID: {vuln.id} • Discovered: {vuln.discovered}</p>
                        </div>
                        <Badge variant={
                          vuln.status === "Resolved" ? "outline" : 
                          vuln.status === "In Progress" ? "secondary" : 
                          "default"
                        } className="text-xs">
                          {vuln.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{vuln.description}</p>
                      <div className="mt-2 text-xs text-gray-500">System: {vuln.system}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <CheckCircle size={20} className="text-primary" />
                  Compliance Status
                </CardTitle>
                <CardDescription>Regulatory and industry compliance status</CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  {complianceFrameworks.map((framework, index) => (
                    <div key={index} className="p-3 bg-background/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">{framework.name}</h3>
                        <Badge variant={
                          framework.status === "Compliant" ? "default" : 
                          framework.status === "Partial" ? "secondary" : 
                          "destructive"
                        } className="text-xs">
                          {framework.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span>Compliance Score</span>
                          <span className={getScoreColor(framework.compliance)}>{framework.compliance}%</span>
                        </div>
                        <Progress value={framework.compliance} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Recommendations */}
          <div className="mb-8">
            <h2 className="text-xl font-bold gradient-text mb-4 font-header">SECURITY RECOMMENDATIONS</h2>
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div className="p-3 bg-background/50 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">Update SSL Certificates</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Multiple web servers have SSL certificates that will expire within 30 days. Renew these certificates to prevent service disruption and security warnings.</p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" className="h-8 text-xs">Take Action</Button>
                          <Button variant="outline" size="sm" className="h-8 text-xs">Dismiss</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-background/50 rounded-lg border-l-4 border-amber-500">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">Strengthen Password Policies</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Current password policies do not enforce sufficient complexity requirements. Update policies to require longer passwords with a mix of character types.</p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" className="h-8 text-xs">Take Action</Button>
                          <Button variant="outline" size="sm" className="h-8 text-xs">Dismiss</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-background/50 rounded-lg border-l-4 border-primary">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">Enable Multi-Factor Authentication</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Only 65% of administrative accounts have MFA enabled. Enable MFA for all administrative accounts to improve security posture.</p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" className="h-8 text-xs">Take Action</Button>
                          <Button variant="outline" size="sm" className="h-8 text-xs">Dismiss</Button>
                        </div>
                      </div>
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