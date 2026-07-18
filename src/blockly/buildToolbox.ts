import { BLOCK_REGISTRY, CATEGORIES } from "./blockRegistry";

export function buildToolbox(blockTypes: string[]) {
  const grouped: Record<string, string[]> = {};

  // Go through each block type the API told us to show
  for (const blockType of blockTypes) {
    const def = BLOCK_REGISTRY[blockType];

    if (!def) {
      console.warn(`Unknown block type "${blockType}" — not in BLOCK_REGISTRY, skipping.`);
      continue;
    }

    if (!grouped[def.category]) {
      grouped[def.category] = [];
    }
    grouped[def.category].push(def.type);
  }

  // Now build the actual toolbox category entries from what we grouped
  const contents = Object.keys(grouped).map((categoryKey) => {
    const categoryMeta = CATEGORIES[categoryKey];
    const blockTypesInCategory = grouped[categoryKey];

    return {
      kind: "category" as const,
      name: categoryMeta.name,
      colour: categoryMeta.colour,
      contents: blockTypesInCategory.map((type) => ({
        kind: "block" as const,
        type,
      })),
    };
  });

  return {
    kind: "categoryToolbox" as const,
    contents,
  };
}