import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useEffect, useRef, useState, useCallback } from "react";
import * as Blockly from "blockly";
import "blockly/blocks";

export const Route = createFileRoute("/mypage")({
  component: MyPage,
});

function MyPage() {
  const blocklyDiv = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const [containerReady, setContainerReady] = useState(false);

  // Callback ref: fires when the div actually mounts (after ProtectedRoute
  // finishes its auth check and renders the real children), not just on
  // component mount like a plain useEffect([]) would.
  const setBlocklyRef = useCallback((node: HTMLDivElement | null) => {
    blocklyDiv.current = node;
    if (node) {
      setContainerReady(true);
    }
  }, []);

  useEffect(() => {
    if (!containerReady || !blocklyDiv.current) return;

    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: {
        kind: "categoryToolbox",
        contents: [
          {
            kind: "category",
            name: "Logic",
            colour: "#5b80a5",
            contents: [
              {
                kind: "block",
                type: "controls_if",
              },
            ],
          },
          {
            kind: "category",
            name: "Math",
            colour: "#5b67a5",
            contents: [
              {
                kind: "block",
                type: "math_number",
              },
            ],
          },
        ],
      },
    });

    workspaceRef.current = workspace;

    return () => {
      workspace.dispose();
      workspaceRef.current = null;
    };
  }, [containerReady]);

  return (
    <ProtectedRoute>
      <main>
        <h1>Hello World My Page</h1>

        <div
          ref={setBlocklyRef}
          style={{
            width: "800px",
            height: "600px",
          }}
        />
      </main>
    </ProtectedRoute>
  );
}