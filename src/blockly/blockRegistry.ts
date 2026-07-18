export interface BlockCategory {
  name: string;
  colour: string;
}

export interface BlockDefinition {
  type: string;
  category: string;
}

export const CATEGORIES: Record<string, BlockCategory> = {
  logic: { name: "Logic", colour: "#5b80a5" },
  math: { name: "Math", colour: "#5b67a5" },
  loops: { name: "Loops", colour: "#5ba55b" },
  text: { name: "Text", colour: "#a5745b" },
  movement: { name: "Movement", colour: "#5ba55b" },
};

export const BLOCK_REGISTRY: Record<string, BlockDefinition> = {
  controls_if: { type: "controls_if", category: "logic" },
  logic_compare: { type: "logic_compare", category: "logic" },
  logic_operation: { type: "logic_operation", category: "logic" },
  math_number: { type: "math_number", category: "math" },
  math_arithmetic: { type: "math_arithmetic", category: "math" },
  controls_repeat_ext: { type: "controls_repeat_ext", category: "loops" },
  text: { type: "text", category: "text" },
  go_straight: { type: "go_straight", category: "movement" },
  turn_left: { type: "turn_left", category: "movement" },
  turn_right: { type: "turn_right", category: "movement" },
};