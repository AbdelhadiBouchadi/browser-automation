"use client"

import { useCallback, useState } from "react"
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ConnectionLineType,
  type Connection,
  type Edge,
  type EdgeChange,
  type ColorMode,
  type Node,
  type NodeChange,
} from "@xyflow/react"
import { useTheme } from "next-themes"

import { useMounted } from "@/hooks/use-mounted"

import "@xyflow/react/dist/style.css"

const initialNodes: Node[] = [
  {
    id: "n1",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "Start" },
  },
  { id: "n2", position: { x: 0, y: 120 }, data: { label: "Step" } },
  {
    id: "n3",
    type: "output",
    position: { x: 0, y: 240 },
    data: { label: "End" },
  },
]

const initialEdges: Edge[] = [
  { id: "n1-n2", source: "n1", target: "n2" },
  { id: "n2-n3", source: "n2", target: "n3" },
]

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodes) => applyNodeChanges(changes, nodes)),
    []
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edges) => applyEdgeChanges(changes, edges)),
    []
  )
  const onConnect = useCallback(
    (connection: Connection) => setEdges((edges) => addEdge(connection, edges)),
    []
  )

  // next-themes reads the stored theme on the client, so the server has no
  // value to match: rendering it before mount would hydrate a `dark` canvas
  // over `light` server markup. Pin it to "light" until then.
  const colorMode: ColorMode = mounted
    ? ((resolvedTheme as ColorMode) ?? "light")
    : "light"

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={colorMode}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: "var(--border)" }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "var(--border)" },
        }}
        style={
          {
            "--xy-background-color": "var(--background)",
            "--xy-edge-stroke-width": 2,
            "--xy-connectionline-stroke-width": 2,
          } as React.CSSProperties
        }
      >
        <Background />
        <MiniMap pannable zoomable />
        <Controls />
      </ReactFlow>
    </div>
  )
}
