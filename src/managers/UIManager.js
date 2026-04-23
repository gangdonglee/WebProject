window.ZeroPointThree = window.ZeroPointThree || {};

(() => {
  class UIManager {
    constructor(config) {
      this.config = config;
      this.transitionTimeoutId = 0;
      this.failureTimeoutId = 0;
      this.elements = {
        appShell: document.getElementById("app-shell"),
        titleScreen: document.getElementById("title-screen"),
        gameScreen: document.getElementById("game-screen"),
        resultScreen: document.getElementById("result-screen"),
        projectName: document.getElementById("project-name"),
        modeName: document.getElementById("mode-name"),
        titleBestScore: document.getElementById("title-best-score"),
        startButton: document.getElementById("start-button"),
        restartButton: document.getElementById("restart-button"),
        scoreValue: document.getElementById("score-value"),
        bestValue: document.getElementById("best-value"),
        reactionValue: document.getElementById("reaction-value"),
        shiftValue: document.getElementById("shift-value"),
        ruleCard: document.getElementById("rule-card"),
        ruleLabel: document.getElementById("rule-label"),
        ruleHint: document.getElementById("rule-hint"),
        timerFill: document.getElementById("timer-fill"),
        ruleTransition: document.getElementById("rule-transition"),
        transitionLabel: document.getElementById("transition-label"),
        transitionHint: document.getElementById("transition-hint"),
        gameArena: document.getElementById("game-arena"),
        stimulusSlot: document.getElementById("stimulus-slot"),
        resultScore: document.getElementById("result-score"),
        resultBest: document.getElementById("result-best"),
        resultReason: document.getElementById("result-reason"),
        resultRule: document.getElementById("result-rule"),
      };
    }

    getInputElements() {
      return {
        startButton: this.elements.startButton,
        restartButton: this.elements.restartButton,
        gameArena: this.elements.gameArena,
      };
    }

    setStaticContent() {
      this.elements.projectName.textContent = this.config.projectName;
      this.elements.modeName.textContent = this.config.modeName;
    }

    setScreen(screenName) {
      const screenLookup = {
        title: this.elements.titleScreen,
        game: this.elements.gameScreen,
        result: this.elements.resultScreen,
      };

      Object.values(screenLookup).forEach((screen) => {
        screen.classList.remove("is-active");
      });

      screenLookup[screenName]?.classList.add("is-active");
      document.body.dataset.activeScreen = screenName;
    }

    updateBestScore(bestScore) {
      const bestText = String(bestScore);
      this.elements.titleBestScore.textContent = bestText;
      this.elements.bestValue.textContent = bestText;
      this.elements.resultBest.textContent = bestText;
    }

    updateGameplayHUD({ score, reactionSeconds, pointsUntilShift, rule }) {
      this.elements.scoreValue.textContent = String(score);
      this.elements.reactionValue.textContent = `${reactionSeconds.toFixed(2)}s`;
      this.elements.shiftValue.textContent = String(pointsUntilShift);
      this.updateRule(rule);
    }

    updateRule(rule) {
      this.elements.ruleCard.dataset.accent = rule.accent;
      this.elements.ruleLabel.textContent = rule.label;
      this.elements.ruleHint.textContent = rule.hint;
    }

    renderStimulus(stimulus) {
      const stimulusElement = document.createElement("div");
      stimulusElement.className = `stimulus ${stimulus.colorClassName} ${stimulus.shapeClassName}`;
      stimulusElement.setAttribute("aria-label", stimulus.accessibleLabel);
      this.elements.stimulusSlot.replaceChildren(stimulusElement);
    }

    clearStimulus() {
      this.elements.stimulusSlot.replaceChildren();
    }

    resetTimer() {
      this.elements.timerFill.style.transition = "none";
      this.elements.timerFill.style.transform = "scaleX(1)";
      void this.elements.timerFill.offsetWidth;
    }

    startTimer(durationMs) {
      this.resetTimer();

      window.requestAnimationFrame(() => {
        this.elements.timerFill.style.transition = `transform ${durationMs}ms linear`;
        this.elements.timerFill.style.transform = "scaleX(0)";
      });
    }

    stopTimer() {
      this.resetTimer();
    }

    showRuleTransition(rule, durationMs) {
      window.clearTimeout(this.transitionTimeoutId);

      this.elements.transitionLabel.textContent = rule.shortLabel;
      this.elements.transitionHint.textContent = rule.hint;
      this.elements.ruleTransition.classList.add("is-visible");
      this.elements.ruleTransition.setAttribute("aria-hidden", "false");

      this.transitionTimeoutId = window.setTimeout(() => {
        this.hideRuleTransition();
      }, durationMs);
    }

    hideRuleTransition() {
      window.clearTimeout(this.transitionTimeoutId);
      this.elements.ruleTransition.classList.remove("is-visible");
      this.elements.ruleTransition.setAttribute("aria-hidden", "true");
    }

    flashFailure() {
      window.clearTimeout(this.failureTimeoutId);
      this.elements.appShell.classList.add("is-failing");

      this.failureTimeoutId = window.setTimeout(() => {
        this.elements.appShell.classList.remove("is-failing");
      }, 300);
    }

    setArenaEnabled(enabled) {
      this.elements.gameArena.disabled = !enabled;
      this.elements.gameArena.classList.toggle("is-disabled", !enabled);
    }

    showResult({ score, bestScore, failureReason, lastRuleLabel }) {
      this.elements.resultScore.textContent = String(score);
      this.elements.resultBest.textContent = String(bestScore);
      this.elements.resultReason.textContent = failureReason;
      this.elements.resultRule.textContent = `마지막 규칙: ${lastRuleLabel}`;
    }
  }

  window.ZeroPointThree.UIManager = UIManager;
})();
