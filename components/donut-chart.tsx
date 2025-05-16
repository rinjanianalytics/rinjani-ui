"use client"

import type React from "react"

interface DonutChartSegment {
  value: number
  color: string
  label?: string
}

interface DonutChartProps {
  data: DonutChartSegment[]
  size?: number
  thickness?: number
  className?: string
  centerContent?: React.ReactNode
}

export default function DonutChart({
  data,
  size = 128,
  thickness = 24,
  className = "",
  centerContent,
}: DonutChartProps) {
  const total = data.reduce((acc, segment) => acc + segment.value, 0)
  const radius = size / 2
  const innerRadius = radius - thickness
  const centerX = radius
  const centerY = radius

  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * (radius - thickness / 2)

  let startAngle = 0

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((segment, index) => {
          // Calculate the percentage and angle for this segment
          const percentage = segment.value / total
          const angle = percentage * 360
          const endAngle = startAngle + angle

          // Calculate the SVG arc path
          const x1 = centerX + innerRadius * Math.cos((startAngle * Math.PI) / 180)
          const y1 = centerY + innerRadius * Math.sin((startAngle * Math.PI) / 180)
          const x2 = centerX + innerRadius * Math.cos((endAngle * Math.PI) / 180)
          const y2 = centerY + innerRadius * Math.sin((endAngle * Math.PI) / 180)
          const x3 = centerX + radius * Math.cos((endAngle * Math.PI) / 180)
          const y3 = centerY + radius * Math.sin((endAngle * Math.PI) / 180)
          const x4 = centerX + radius * Math.cos((startAngle * Math.PI) / 180)
          const y4 = centerY + radius * Math.sin((startAngle * Math.PI) / 180)

          // Determine if the arc should be drawn as a large arc
          const largeArcFlag = angle > 180 ? 1 : 0

          // Create the path for the segment
          const path = [
            `M ${x1} ${y1}`, // Move to inner start point
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Inner arc
            `L ${x3} ${y3}`, // Line to outer end point
            `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x4} ${y4}`, // Outer arc (reverse direction)
            "Z", // Close path
          ].join(" ")

          // Update the start angle for the next segment
          startAngle = endAngle

          return <path key={index} d={path} fill={segment.color} />
        })}
      </svg>

      {/* Center content */}
      {centerContent && <div className="absolute inset-0 flex items-center justify-center">{centerContent}</div>}
    </div>
  )
}
