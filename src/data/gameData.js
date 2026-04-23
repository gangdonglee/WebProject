window.ZeroPointThree = window.ZeroPointThree || {};

(() => {
  const COLORS = Object.freeze([
    { id: "red", label: "Red", className: "color-red", hex: "#ff5a5f" },
    { id: "blue", label: "Blue", className: "color-blue", hex: "#4ea8ff" },
    { id: "gold", label: "Gold", className: "color-gold", hex: "#ffd166" },
    { id: "mint", label: "Mint", className: "color-mint", hex: "#44e1b1" },
  ]);

  const SHAPES = Object.freeze([
    { id: "circle", label: "Circle", className: "shape-circle" },
    { id: "square", label: "Square", className: "shape-square" },
    { id: "triangle", label: "Triangle", className: "shape-triangle" },
    { id: "diamond", label: "Diamond", className: "shape-diamond" },
  ]);

  const RULES = Object.freeze([
    {
      id: "tap-red",
      label: "빨간 도형이면 탭",
      shortLabel: "TAP RED",
      hint: "빨간색 자극에만 반응하고 나머지는 무시하세요.",
      match: { property: "colorId", equals: "red" },
      accent: "red",
    },
    {
      id: "tap-blue",
      label: "파란 도형이면 탭",
      shortLabel: "TAP BLUE",
      hint: "파란색 자극에만 반응하고 나머지는 무시하세요.",
      match: { property: "colorId", equals: "blue" },
      accent: "blue",
    },
    {
      id: "tap-square",
      label: "네모면 탭",
      shortLabel: "TAP SQUARE",
      hint: "네모 도형에만 반응하고 나머지는 무시하세요.",
      match: { property: "shapeId", equals: "square" },
      accent: "gold",
    },
  ]);

  const CONFIG = Object.freeze({
    projectName: "zero_point_three",
    modeName: "Chaos Mode 01",
    startReactionTime: 1.2,
    reactionStep: 0.05,
    minimumReactionTime: 0.35,
    pointsPerRuleShift: 5,
    targetProbability: 0.58,
    transitionDurationMs: 680,
    roundGapMs: 140,
    storageKey: "zero_point_three.bestScore",
  });

  window.ZeroPointThree.GameData = Object.freeze({
    COLORS,
    SHAPES,
    RULES,
    CONFIG,
  });
})();
