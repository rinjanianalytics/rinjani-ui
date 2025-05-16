"use client"

import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

interface HeatmapData {
  day: number // 0-6 (Sunday to Saturday)
  hour: number // 0-23
  value: number // Intensity value
}

interface HeatmapChartProps {
  data: HeatmapData[]
  width?: number
  height?: number
  margin?: { top: number; right: number; bottom: number; left: number }
  colorRange?: [string, string]
}

export default function HeatmapChart({
  data,
  width = 400,
  height = 200,
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
  colorRange = ["#f7fbff", "hsl(var(--primary))"]
}: HeatmapChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Set up dimensions
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Create scales
    const xScale = d3.scaleBand()
      .domain(d3.range(24).map(d => d.toString()))
      .range([0, innerWidth])
      .padding(0.05)

    const yScale = d3.scaleBand()
      .domain(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])
      .range([0, innerHeight])
      .padding(0.05)

    // Find min and max values for color scale
    const minValue = d3.min(data, d => d.value) || 0
    const maxValue = d3.max(data, d => d.value) || 1

    // Create color scale
    const colorScale = d3.scaleLinear<string>()
      .domain([minValue, maxValue])
      .range(colorRange as [string, string])

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)

    // Create chart group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Add cells
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.hour.toString()) || 0)
      .attr("y", d => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return yScale(days[d.day]) || 0
      })
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", d => colorScale(d.value))
      .attr("rx", 2)
      .attr("ry", 2)
      .append("title")
      .text(d => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return `${days[d.day]} ${d.hour}:00 - ${d.hour + 1}:00: ${d.value} incidents`
      })

    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickValues(xScale.domain().filter((_, i) => i % 3 === 0)))
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", 28)
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .text("Hour of Day")

    // Add y-axis
    g.append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -35)
      .attr("x", -innerHeight / 2)
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .text("Day of Week")

  }, [data, width, height, margin, colorRange])

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ maxWidth: '100%' }}
    />
  )
}