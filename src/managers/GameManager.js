window.ZeroPointThree = window.ZeroPointThree || {};

(() => {
  class GameManager {
    constructor({ config, ruleManager, stimulusManager, inputManager, uiManager, saveManager }) {
      this.config = config;
      this.ruleManager = ruleManager;
      this.stimulusManager = stimulusManager;
      this.inputManager = inputManager;
      this.uiManager = uiManager;
      this.saveManager = saveManager;

      this.state = "title";
      this.score = 0;
      this.bestScore = 0;
      this.currentStimulus = null;
      this.roundTimerId = 0;
      this.queueTimerId = 0;
      this.turnResolved = false;
    }

    initialize() {
      this.bestScore = this.saveManager.getBestScore();

      this.uiManager.setStaticContent();
      this.uiManager.updateBestScore(this.bestScore);
      this.uiManager.setScreen("title");
      this.uiManager.setArenaEnabled(false);

      this.inputManager.bind({
        onStartRequest: () => this.startGame(),
        onRestartRequest: () => this.restartGame(),
        onPrimaryAction: (payload) => this.handlePrimaryAction(payload),
        onArenaTap: (payload) => this.handleArenaTap(payload),
      });
    }

    startGame() {
      if (this.state === "playing") {
        return;
      }

      this.clearTimers();
      this.state = "playing";
      this.score = 0;
      this.currentStimulus = null;
      this.turnResolved = false;
      this.bestScore = this.saveManager.getBestScore();

      this.ruleManager.reset();
      this.stimulusManager.reset();
      this.inputManager.setGameplayEnabled(false);
      this.uiManager.clearStimulus();
      this.uiManager.stopTimer();
      this.uiManager.hideRuleTransition();
      this.uiManager.updateBestScore(this.bestScore);
      this.uiManager.setScreen("game");
      this.updateGameplayHUD();

      console.info("[zero_point_three] Session started", {
        rule: this.ruleManager.getActiveRule().label,
      });

      this.queueNextTurn(true);
    }

    restartGame() {
      this.startGame();
    }

    handlePrimaryAction(payload) {
      if (this.state === "title") {
        this.startGame();
        return;
      }

      if (this.state === "result") {
        this.restartGame();
        return;
      }

      if (this.state === "playing") {
        this.handleArenaTap(payload);
      }
    }

    handleArenaTap(payload) {
      if (this.state !== "playing" || this.turnResolved || !this.currentStimulus) {
        return;
      }

      this.turnResolved = true;
      this.clearRoundTimer();
      this.inputManager.setGameplayEnabled(false);

      const stimulus = this.currentStimulus;
      this.currentStimulus = null;

      if (!stimulus.shouldTap) {
        this.endGame("무시해야 할 자극을 탭했습니다.");
        return;
      }

      this.score += 1;

      const shiftResult = this.ruleManager.maybeShiftRule(this.score);
      this.updateGameplayHUD();

      console.debug("[zero_point_three] Correct tap", {
        score: this.score,
        inputSource: payload.source,
        nextRule: this.ruleManager.getActiveRule().label,
        shifted: shiftResult.shifted,
      });

      this.queueNextTurn(shiftResult.shifted);
    }

    startTurn() {
      if (this.state !== "playing") {
        return;
      }

      const activeRule = this.ruleManager.getActiveRule();
      const nextStimulus = this.stimulusManager.createStimulus(activeRule);
      const reactionWindowMs = this.getReactionWindowMs();

      this.currentStimulus = nextStimulus;
      this.turnResolved = false;

      this.uiManager.renderStimulus(nextStimulus);
      this.uiManager.startTimer(reactionWindowMs);
      this.inputManager.setGameplayEnabled(true);
      this.updateGameplayHUD();

      this.roundTimerId = window.setTimeout(() => {
        this.handleTurnTimeout();
      }, reactionWindowMs);
    }

    handleTurnTimeout() {
      if (this.state !== "playing" || this.turnResolved || !this.currentStimulus) {
        return;
      }

      this.turnResolved = true;
      this.inputManager.setGameplayEnabled(false);

      const stimulus = this.currentStimulus;
      this.currentStimulus = null;

      if (stimulus.shouldTap) {
        this.endGame("정답 자극을 제시간에 탭하지 못했습니다.");
        return;
      }

      this.queueNextTurn(false);
    }

    queueNextTurn(showTransition) {
      if (this.state !== "playing") {
        return;
      }

      this.clearTimers();
      this.currentStimulus = null;
      this.uiManager.clearStimulus();
      this.uiManager.stopTimer();
      this.inputManager.setGameplayEnabled(false);
      this.updateGameplayHUD();

      const delayMs = showTransition ? this.config.transitionDurationMs : this.config.roundGapMs;

      if (showTransition) {
        const nextRule = this.ruleManager.getActiveRule();

        this.uiManager.showRuleTransition(nextRule, this.config.transitionDurationMs);
        console.info("[zero_point_three] Rule switched", {
          score: this.score,
          rule: nextRule.label,
          reactionWindow: this.getReactionWindowSeconds(),
        });
      }

      this.queueTimerId = window.setTimeout(() => {
        this.startTurn();
      }, delayMs);
    }

    endGame(failureReason) {
      this.clearTimers();
      this.state = "result";
      this.currentStimulus = null;

      const lastRuleLabel = this.ruleManager.getActiveRule().label;

      this.inputManager.setGameplayEnabled(false);
      this.uiManager.stopTimer();
      this.uiManager.clearStimulus();
      this.uiManager.hideRuleTransition();
      this.uiManager.flashFailure();

      this.bestScore = this.saveManager.saveBestScore(this.score);
      this.uiManager.updateBestScore(this.bestScore);
      this.uiManager.showResult({
        score: this.score,
        bestScore: this.bestScore,
        failureReason,
        lastRuleLabel,
      });
      this.uiManager.setScreen("result");

      console.groupCollapsed("[zero_point_three] Session End");
      console.log("Score:", this.score);
      console.log("Failure reason:", failureReason);
      console.log("Last rule:", lastRuleLabel);
      console.groupEnd();
    }

    updateGameplayHUD() {
      this.uiManager.updateGameplayHUD({
        score: this.score,
        reactionSeconds: this.getReactionWindowSeconds(),
        pointsUntilShift: this.getPointsUntilNextRuleShift(),
        rule: this.ruleManager.getActiveRule(),
      });
    }

    getReactionWindowSeconds() {
      const decreaseSteps = Math.floor(this.score / this.config.pointsPerRuleShift);
      const reactionWindow =
        this.config.startReactionTime - decreaseSteps * this.config.reactionStep;

      return Math.max(this.config.minimumReactionTime, Number(reactionWindow.toFixed(2)));
    }

    getReactionWindowMs() {
      return Math.round(this.getReactionWindowSeconds() * 1000);
    }

    getPointsUntilNextRuleShift() {
      const remainder = this.score % this.config.pointsPerRuleShift;
      return remainder === 0
        ? this.config.pointsPerRuleShift
        : this.config.pointsPerRuleShift - remainder;
    }

    clearRoundTimer() {
      window.clearTimeout(this.roundTimerId);
      this.roundTimerId = 0;
    }

    clearTimers() {
      this.clearRoundTimer();
      window.clearTimeout(this.queueTimerId);
      this.queueTimerId = 0;
    }
  }

  window.ZeroPointThree.GameManager = GameManager;
})();
