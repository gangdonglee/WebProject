window.ZeroPointThree = window.ZeroPointThree || {};

(() => {
  class StimulusManager {
    constructor(colors, shapes, config, ruleManager) {
      this.colors = colors;
      this.shapes = shapes;
      this.config = config;
      this.ruleManager = ruleManager;
      this.lastStimulusId = null;
      this.turnCount = 0;
      this.stimulusPool = this.buildStimulusPool();
    }

    reset() {
      this.lastStimulusId = null;
      this.turnCount = 0;
    }

    createStimulus(rule) {
      this.turnCount += 1;

      const shouldTap = Math.random() < this.config.targetProbability;
      const pool = this.stimulusPool.filter((stimulus) => {
        const matchesRule = this.ruleManager.matchesRule(rule, stimulus);
        return shouldTap ? matchesRule : !matchesRule;
      });

      const nextStimulus = this.pickStimulus(pool);
      return {
        ...nextStimulus,
        shouldTap,
      };
    }

    buildStimulusPool() {
      return this.colors.flatMap((color) =>
        this.shapes.map((shape) => ({
          id: `${color.id}-${shape.id}`,
          colorId: color.id,
          colorLabel: color.label,
          colorClassName: color.className,
          colorHex: color.hex,
          shapeId: shape.id,
          shapeLabel: shape.label,
          shapeClassName: shape.className,
          accessibleLabel: `${color.label} ${shape.label}`,
        })),
      );
    }

    pickStimulus(pool) {
      const filteredPool =
        pool.length > 1 ? pool.filter((stimulus) => stimulus.id !== this.lastStimulusId) : pool;
      const nextIndex = Math.floor(Math.random() * filteredPool.length);
      const nextStimulus = filteredPool[nextIndex];

      this.lastStimulusId = nextStimulus.id;
      return nextStimulus;
    }
  }

  window.ZeroPointThree.StimulusManager = StimulusManager;
})();
