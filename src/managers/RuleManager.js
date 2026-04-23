window.ZeroPointThree = window.ZeroPointThree || {};

(() => {
  class RuleManager {
    constructor(rules, config) {
      this.rules = rules;
      this.config = config;
      this.activeRuleIndex = 0;
      this.completedShiftCount = 0;
    }

    reset() {
      this.completedShiftCount = 0;
      this.activeRuleIndex = this.pickRandomRuleIndex();
    }

    getActiveRule() {
      return this.rules[this.activeRuleIndex];
    }

    maybeShiftRule(score) {
      const nextShiftCount = Math.floor(score / this.config.pointsPerRuleShift);

      if (score === 0 || nextShiftCount <= this.completedShiftCount) {
        return {
          shifted: false,
          rule: this.getActiveRule(),
          shiftCount: this.completedShiftCount,
        };
      }

      this.completedShiftCount = nextShiftCount;
      this.activeRuleIndex = this.pickRandomRuleIndex(this.activeRuleIndex);

      return {
        shifted: true,
        rule: this.getActiveRule(),
        shiftCount: this.completedShiftCount,
      };
    }

    matchesRule(rule, stimulus) {
      const matcher = rule.match ?? {};

      if (matcher.property) {
        return stimulus[matcher.property] === matcher.equals;
      }

      if (Array.isArray(matcher.all)) {
        return matcher.all.every((condition) => stimulus[condition.property] === condition.equals);
      }

      if (Array.isArray(matcher.any)) {
        return matcher.any.some((condition) => stimulus[condition.property] === condition.equals);
      }

      return false;
    }

    pickRandomRuleIndex(excludedIndex = null) {
      const availableIndexes = this.rules
        .map((rule, index) => index)
        .filter((index) => index !== excludedIndex);

      const randomIndex = Math.floor(Math.random() * availableIndexes.length);
      return availableIndexes[randomIndex];
    }
  }

  window.ZeroPointThree.RuleManager = RuleManager;
})();
