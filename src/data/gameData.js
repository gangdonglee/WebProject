window.ZeroPointThree = window.ZeroPointThree || {};

(() => {
  const COLORS = Object.freeze([
    { id: "red", label: "\ube68\uac15", className: "color-red", hex: "#ff4c62" },
    { id: "blue", label: "\ud30c\ub791", className: "color-blue", hex: "#3db2ff" },
    { id: "gold", label: "\ub178\ub791", className: "color-gold", hex: "#f5ff47" },
    { id: "mint", label: "\ubbfc\ud2b8", className: "color-mint", hex: "#2ff0b2" },
  ]);

  const SHAPES = Object.freeze([
    { id: "circle", label: "\ub3d9\uadf8\ub77c\ubbf8", className: "shape-circle" },
    { id: "square", label: "\ub124\ubaa8", className: "shape-square" },
    { id: "triangle", label: "\uc138\ubaa8", className: "shape-triangle" },
    { id: "diamond", label: "\ub9c8\ub984\ubaa8", className: "shape-diamond" },
  ]);

  const RULES = Object.freeze([
    {
      id: "tap-red",
      label: "\ube68\uac04 \ub3c4\ud615\uc774\uba74 \ud0ed",
      shortLabel: "TAP RED",
      hint: "\ube68\uac04 \ub3c4\ud615\ub9cc \ubc18\uc751\ud558\uace0 \ub098\uba38\uc9c0\ub294 \ubb34\uc2dc\ud558\uc138\uc694.",
      match: { property: "colorId", equals: "red" },
      accent: "red",
    },
    {
      id: "tap-blue",
      label: "\ud30c\ub780 \ub3c4\ud615\uc774\uba74 \ud0ed",
      shortLabel: "TAP BLUE",
      hint: "\ud30c\ub780 \ub3c4\ud615\ub9cc \ubc18\uc751\ud558\uace0 \ub098\uba38\uc9c0\ub294 \ubb34\uc2dc\ud558\uc138\uc694.",
      match: { property: "colorId", equals: "blue" },
      accent: "blue",
    },
    {
      id: "tap-square",
      label: "\ub124\ubaa8\uba74 \ud0ed",
      shortLabel: "TAP SQUARE",
      hint: "\ub124\ubaa8\ub9cc \ubc18\uc751\ud558\uace0 \ub098\uba38\uc9c0\ub294 \ubb34\uc2dc\ud558\uc138\uc694.",
      match: { property: "shapeId", equals: "square" },
      accent: "gold",
    },
    {
      id: "tap-gold-triangle",
      label: "\ub178\ub780\uc0c9 \uc138\ubaa8\ub9cc \ud0ed",
      shortLabel: "YELLOW TRIANGLE",
      hint:
        "\ub178\ub780\uc0c9\uc774\uba74\uc11c \uc138\ubaa8\uc778 \uc790\uadf9\uc5d0\ub9cc \ubc18\uc751\ud558\uace0 \ub098\uba38\uc9c0\ub294 \ubb34\uc2dc\ud558\uc138\uc694.",
      match: {
        all: [
          { property: "colorId", equals: "gold" },
          { property: "shapeId", equals: "triangle" },
        ],
      },
      accent: "gold",
    },
    {
      id: "tap-blue-diamond",
      label: "\ud30c\ub780\uc0c9 \ub9c8\ub984\ubaa8\ub9cc \ud0ed",
      shortLabel: "BLUE DIAMOND",
      hint:
        "\ud30c\ub780\uc0c9\uc774\uba74\uc11c \ub9c8\ub984\ubaa8\uc778 \uc790\uadf9\uc5d0\ub9cc \ubc18\uc751\ud558\uace0 \ub098\uba38\uc9c0\ub294 \ubb34\uc2dc\ud558\uc138\uc694.",
      match: {
        all: [
          { property: "colorId", equals: "blue" },
          { property: "shapeId", equals: "diamond" },
        ],
      },
      accent: "blue",
    },
    {
      id: "tap-red-circle",
      label: "\ube68\uac04\uc0c9 \ub3d9\uadf8\ub77c\ubbf8\ub9cc \ud0ed",
      shortLabel: "RED CIRCLE",
      hint:
        "\ube68\uac04\uc0c9\uc774\uba74\uc11c \ub3d9\uadf8\ub77c\ubbf8\uc778 \uc790\uadf9\uc5d0\ub9cc \ubc18\uc751\ud558\uace0 \ub098\uba38\uc9c0\ub294 \ubb34\uc2dc\ud558\uc138\uc694.",
      match: {
        all: [
          { property: "colorId", equals: "red" },
          { property: "shapeId", equals: "circle" },
        ],
      },
      accent: "red",
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
