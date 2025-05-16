"use client"

import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

interface Node {
  id: string
  name: string
  type: string
  group: number
}

interface Link {
  source: string
  target: string
  value: number
}

interface ForceGraphProps {
  nodes: Node[]
  links: Link[]
  nodeColor?: (node: Node) => string
  nodeLabel?: (node: Node) => string
  linkDirectionalArrowLength?: number
}

export default function ForceGraph({
  nodes,
  links,
  nodeColor = () => "#1f77b4",
  nodeLabel = (node) => node.name,
  linkDirectionalArrowLength = 0
}: ForceGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove()

    // Create the simulation with forces
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))

    // Create the SVG elements
    const svg = d3.select(svgRef.current)

    // Add arrows for directional links if needed
    if (linkDirectionalArrowLength > 0) {
      svg.append("defs").selectAll("marker")
        .data(["end"])
        .enter().append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#999");
    }

    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d: any) => Math.sqrt(d.value))
      .attr("marker-end", linkDirectionalArrowLength > 0 ? "url(#arrow)" : "");

    // Create nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", 8)
      .attr("fill", (d: any) => nodeColor(d))
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Add tooltips
    node.append("title")
      .text((d: any) => nodeLabel(d));

    // Add text labels
    const text = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text((d: any) => d.name)
      .style("font-size", "10px");

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      text
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [nodes, links, nodeColor, nodeLabel, linkDirectionalArrowLength]);

  return (
    <svg 
      ref={svgRef} 
      width="100%" 
      height="100%" 
      style={{ overflow: 'visible' }}
    />
  );
}