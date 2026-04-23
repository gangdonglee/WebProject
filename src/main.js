window.ZeroPointThree = window.ZeroPointThree || {};

(() => {
  const namespace = window.ZeroPointThree;
  const { CONFIG, RULES, COLORS, SHAPES } = namespace.GameData;

  const saveManager = new namespace.SaveManager(CONFIG.storageKey);
  const ruleManager = new namespace.RuleManager(RULES, CONFIG);
  const stimulusManager = new namespace.StimulusManager(COLORS, SHAPES, CONFIG, ruleManager);
  const uiManager = new namespace.UIManager(CONFIG);
  const inputManager = new namespace.InputManager(uiManager.getInputElements());

  const gameManager = new namespace.GameManager({
    config: CONFIG,
    ruleManager,
    stimulusManager,
    inputManager,
    uiManager,
    saveManager,
  });

  gameManager.initialize();
  document.body.dataset.appReady = "true";
  document.body.dataset.project = CONFIG.projectName;
  window.zeroPointThreeGame = gameManager;
})();
