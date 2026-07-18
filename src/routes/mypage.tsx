import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useEffect, useRef, useState, useCallback } from "react";
import * as Blockly from "blockly";
import "blockly/blocks";
import { buildToolbox } from "@/blockly/buildToolbox";
import { registerCustomBlocks } from "@/blockly/customBlocks";

export const Route = createFileRoute("/mypage")({
  component: MyPage,
});

const testReceivedCode = {
  blocks: ["controls_if", "math_number", "go_straight", "turn_left", "turn_right"],
  maxBlocks: 10,
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
    registerCustomBlocks();
    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: buildToolbox(testReceivedCode.blocks),
      maxBlocks: testReceivedCode.maxBlocks,
    });

    workspaceRef.current = workspace;

    const resizeObserver = new ResizeObserver(() => {
      Blockly.svgResize(workspace);
    });
    resizeObserver.observe(blocklyDiv.current);

    return () => {
      resizeObserver.disconnect();
      workspace.dispose();
      workspaceRef.current = null;
    };
  }, [containerReady]);

  return (
    <ProtectedRoute>
      <main className="flex flex-col h-screen">
        <h1 className="text-2xl font-bold p-4">Hello World My Page</h1>

        <div
          ref={setBlocklyRef}
          className="flex-1 w-full min-h-0"
        />
      </main>
    </ProtectedRoute>
  );
}