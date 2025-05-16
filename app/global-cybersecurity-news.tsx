import { AlertTriangle, FileWarning, Lock, Server, Globe } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

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

// Helper functions
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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Function to check if a threat is relevant to the organization based on security posture
const isRelevantThreat = (threat: typeof globalThreats[0], securityScores: any[]): boolean => {
  // Check if any of the threat's impact areas match areas where the organization has a low score
  return threat.impactAreas.some(area => {
    const score = securityScores.find(s => s.category === area)?.score || 100
    return score < 70 // Consider relevant if score is below 70
  })
}

export default function GlobalCybersecurityNews({ securityScores }: { securityScores: any[] }) {
  return (
    <>
      {/* Global Cybersecurity News Threats Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white gradient-text">GLOBAL CYBERSECURITY NEWS</h1>
      </div>

      {/* Global Cybersecurity News Threats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {globalThreats.map((threat, index) => {
          const isRelevant = isRelevantThreat(threat, securityScores)
          const IconComponent = threat.icon
          
          return (
            <Card key={index} className={`bg-card border-none rounded-xl overflow-hidden shadow-sm ${isRelevant ? 'ring-1 ring-primary/30' : ''}`}>
              <CardHeader className="p-4 border-b bg-gradient-to-r from-primary/10 to-transparent">
                <div className="flex items-center gap-2">
                  <IconComponent className={`h-5 w-5 ${
                    threat.severity === "Critical"
                      ? "text-red-600 dark:text-red-500"
                      : threat.severity === "High"
                        ? "text-amber-600 dark:text-amber-500"
                        : "text-blue-600 dark:text-blue-500"
                  }`} />
                  <CardTitle className="text-sm truncate text-gray-900 dark:text-white font-semibold">{threat.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{threat.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      threat.severity === "Critical"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : threat.severity === "High"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}>
                      {threat.severity}
                    </span>
                    {threat.cvssScore && (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        threat.severity === "Critical"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : threat.severity === "High"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}>
                        CVSS: {threat.cvssScore}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      threat.relevance === "High"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}>
                      Relevance: {threat.relevance}
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Affected Systems:</div>
                    <div className="flex flex-wrap gap-1">
                      {threat.affectedSystems.map((system, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full">
                          {system}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                    {formatDate(threat.date)}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}