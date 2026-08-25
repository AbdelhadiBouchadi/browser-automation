"use client"

import { useCallback } from "react"
import {
  addEdge,
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type ColorMode,
  type Connection,
  type Edge,
  type NodeTypes,
} from "@xyflow/react"
import { useTheme } from "next-themes"

import { useMounted } from "@/hooks/use-mounted"

import "@xyflow/react/dist/style.css"
import { StepNode } from "./step-node"
import type { StepNodeType } from "../nodes/node-registry"

const nodeTypes: NodeTypes = {
  step: StepNode,
}

const initialNodes: StepNodeType[] = [
  {
    id: "n1",
    type: "step",
    position: { x: 0, y: 0 },
    data: { type: "start", kind: "trigger", title: "Start", values: {} },
  },
  {
    id: "n2",
    type: "step",
    // StepNode puts its handles on the left and right edges, so the flow reads
    // left to right; 320px clears the node's 200px minimum width.
    position: { x: 320, y: 0 },
    data: {
      type: "open-url",
      kind: "action",
      title: "Open URL",
      // Empty so the field renders its placeholder once the inspector edits it.
      values: {},
    },
  },
]

const initialEdges: Edge[] = []

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  // The setter stays elided until there is a way to add nodes to the canvas.
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (connection: Connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
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
        nodeTypes={nodeTypes}
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
