"use client"

import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

interface RadarDataPoint {
  axis: string
  value: number // 0 to 1
}

interface RadarChartProps {
  data: RadarDataPoint[]
  width?: number
  height?: number
  levels?: number
  maxValue?: number
  color?: string
  opacity?: number
  areaOpacity?: number
  dotRadius?: number
  labelFactor?: number
}

export default function RadarChart({
  data,
  width = 300,
  height = 300,
  levels = 5,
  maxValue = 1,
  color = "hsl(var(--primary))",
  opacity = 0.8,
  areaOpacity = 0.35,
  dotRadius = 4,
  labelFactor = 1.2
}: RadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Set up dimensions
    const radius = Math.min(width / 2, height / 2)
    const angleSlice = (Math.PI * 2) / data.length

    // Create scales
    const rScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, radius])

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)

    // Create circular grid
    const axisGrid = svg.append("g").attr("class", "axis-grid")

    // Draw background circles
    axisGrid.selectAll(".level")
      .data(d3.range(1, levels + 1).reverse())
      .enter()
      .append("circle")
      .attr("class", "level")
      .attr("r", d => radius * d / levels)
      .style("fill", "none")
      .style("stroke", "hsl(var(--border))")
      .style("stroke-opacity", "0.75")

    // Create axes
    const axes = axisGrid.selectAll(".axis")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "axis")

    // Draw axis lines
    axes.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
      .style("stroke", "hsl(var(--border))")
      .style("stroke-width", "1px")

    // Draw axis labels
    axes.append("text")
      .attr("class", "legend")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("x", (d, i) => rScale(maxValue * labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y", (d, i) => rScale(maxValue * labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
      .text(d => d.axis)
      .style("font-size", "10px")
      .style("fill", "hsl(var(--foreground))")

    // Create radar line and area
    const radarLine = d3.lineRadial<RadarDataPoint>()
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed)

    const radarArea = d3.areaRadial<RadarDataPoint>()
      .innerRadius(0)
      .outerRadius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed)

    // Draw radar area
    svg.append("path")
      .datum(data)
      .attr("class", "radar-area")
      .attr("d", radarArea as any)
      .style("fill", color)
      .style("fill-opacity", areaOpacity)
      .style("stroke", "none")

    // Draw radar stroke
    svg.append("path")
      .datum(data)
      .attr("class", "radar-stroke")
      .attr("d", radarLine as any)
      .style("stroke-width", "2px")
      .style("stroke", color)
      .style("fill", "none")
      .style("stroke-opacity", opacity)

    // Draw dots at each data point
    svg.selectAll(".radar-dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "radar-dot")
      .attr("r", dotRadius)
      .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .style("fill", color)
      .style("fill-opacity", 0.8)
      .append("title")
      .text(d => `${d.axis}: ${Math.round(d.value * 100)}%`)

  }, [data, width, height, levels, maxValue, color, opacity, areaOpacity, dotRadius, labelFactor])

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ maxWidth: '100%' }}
    />
  )
}