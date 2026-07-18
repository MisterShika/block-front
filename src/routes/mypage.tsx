import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useEffect, useRef, useState, useCallback } from "react";
import * as Blockly from "blockly";
import "blockly/blocks";
import { buildToolbox } from "@/blockly/buildToolbox";

export const Route = createFileRoute("/mypage")({
  component: MyPage,
});

// Stand-in for what the API will eventually return
const testReceivedCode = {
  blocks: ["controls_if", "math_number"],
  maxBlocks: 3,
};

function MyPage() {
  const blocklyDiv = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const [containerReady, setContainerReady] = useState(false);

  const setBlocklyRef = useCallback((node: HTMLDivElement | null) => {
    blocklyDiv.current = node;
    if (node) {
      setContainerReady(true);
    }
  }, []);

  useEffect(() => {
    if (!containerReady || !blocklyDiv.current) return;

    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: buildToolbox(testReceivedCode.blocks),
      maxBlocks: testReceivedCode.maxBlocks,
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