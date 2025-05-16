"use client"

import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
// Note: topojson-client would need to be installed with:
// npm install topojson-client @types/topojson-client

interface ThreatLocation {
  country: string
  count: number
  lat: number
  long: number
}

interface WorldMapChartProps {
  threatData: ThreatLocation[]
  width?: number
  height?: number
  colorRange?: [string, string]
}

export default function WorldMapChart({
  threatData,
  width = 600,
  height = 400,
  colorRange = ["#f7fbff", "hsl(var(--destructive))"]
}: WorldMapChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const loadMap = async () => {
      try {
        // Clear previous chart
        d3.select(svgRef.current).selectAll("*").remove()

        // Create SVG
        const svg = d3.select(svgRef.current)
          .attr("width", width)
          .attr("height", height)

        // Create a simplified world map using circles for regions
        const regions = [
          { name: "North America", lat: 40, long: -100, radius: 30 },
          { name: "South America", lat: -15, long: -60, radius: 25 },
          { name: "Europe", lat: 50, long: 10, radius: 25 },
          { name: "Africa", lat: 0, long: 20, radius: 30 },
          { name: "Asia", lat: 35, long: 100, radius: 35 },
          { name: "Australia", lat: -25, long: 135, radius: 20 },
        ]

        // Create projection
        const projection = d3.geoEquirectangular()
          .scale(width / (2 * Math.PI))
          .translate([width / 2, height / 2])

        // Draw simplified world regions
        svg.selectAll(".region")
          .data(regions)
          .enter()
          .append("circle")
          .attr("class", "region")
          .attr("cx", d => {
            const coords = projection([d.long, d.lat])
            return coords ? coords[0] : 0
          })
          .attr("cy", d => {
            const coords = projection([d.long, d.lat])
            return coords ? coords[1] : 0
          })
          .attr("r", d => d.radius)
          .attr("fill", "hsl(var(--muted))")
          .attr("stroke", "hsl(var(--border))")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.3)

        // Find min and max values for color scale
        const minValue = d3.min(threatData, d => d.count) || 0
        const maxValue = d3.max(threatData, d => d.count) || 1

        // Create color scale
        const colorScale = d3.scaleLinear<string>()
          .domain([minValue, maxValue])
          .range(colorRange as [string, string])

        // Create a map for quick lookup of threat counts by country
        const threatsByCountry = new Map()
        threatData.forEach(d => {
          threatsByCountry.set(d.country, d.count)
        })

        // Add threat points
        svg.selectAll(".threat-point")
          .data(threatData)
          .enter()
          .append("circle")
          .attr("class", "threat-point")
          .attr("cx", d => {
            const coords = projection([d.long, d.lat])
            return coords ? coords[0] : 0
          })
          .attr("cy", d => {
            const coords = projection([d.long, d.lat])
            return coords ? coords[1] : 0
          })
          .attr("r", d => Math.sqrt(d.count) * 2)
          .attr("fill", d => colorScale(d.count))
          .attr("fill-opacity", 0.7)
          .attr("stroke", "white")
          .attr("stroke-width", 0.5)
          .append("title")
          .text(d => `${d.country}: ${d.count} threats`)

        // Draw connections between high-threat areas
        const highThreatLocations = threatData
          .filter(d => d.count > (maxValue * 0.7))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)

        for (let i = 0; i < highThreatLocations.length; i++) {
          for (let j = i + 1; j < highThreatLocations.length; j++) {
            const source = highThreatLocations[i]
            const target = highThreatLocations[j]
            
            const sourceCoords = projection([source.long, source.lat])
            const targetCoords = projection([target.long, target.lat])
            
            if (sourceCoords && targetCoords) {
              svg.append("line")
                .attr("x1", sourceCoords[0])
                .attr("y1", sourceCoords[1])
                .attr("x2", targetCoords[0])
                .attr("y2", targetCoords[1])
                .attr("stroke", "hsl(var(--primary))")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.4)
                .attr("stroke-dasharray", "3,3")
            }
          }
        }

        // Add legend
        const legendWidth = 200
        const legendHeight = 20
        const legendX = width - legendWidth - 20
        const legendY = height - 40

        const legendScale = d3.scaleLinear()
          .domain([minValue, maxValue])
          .range([0, legendWidth])

        const legendAxis = d3.axisBottom(legendScale)
          .ticks(5)
          .tickSize(legendHeight)

        const legend = svg.append("g")
          .attr("transform", `translate(${legendX},${legendY})`)

        // Create gradient for legend
        const defs = svg.append("defs")
        const gradient = defs.append("linearGradient")
          .attr("id", "threat-gradient")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "100%")
          .attr("y2", "0%")

        gradient.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", colorRange[0])

        gradient.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", colorRange[1])

        // Draw legend rectangle
        legend.append("rect")
          .attr("width", legendWidth)
          .attr("height", legendHeight)
          .style("fill", "url(#threat-gradient)")

        // Add legend axis
        legend.append("g")
          .call(legendAxis)
          .select(".domain").remove()

        // Add legend title
        legend.append("text")
          .attr("x", 0)
          .attr("y", -5)
          .style("font-size", "10px")
          .style("fill", "hsl(var(--foreground))")
          .text("Threat Count")

      } catch (error) {
        console.error("Error loading map data:", error)
      }
    }

    loadMap()
  }, [threatData, width, height, colorRange])

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ maxWidth: '100%' }}
    />
  )
}