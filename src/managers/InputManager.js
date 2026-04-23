window.ZeroPointThree = window.ZeroPointThree || {};

(() => {
  class InputManager {
    constructor(elements) {
      this.elements = elements;
      this.callbacks = {};
      this.gameplayEnabled = false;

      this.onStartClick = this.onStartClick.bind(this);
      this.onRestartClick = this.onRestartClick.bind(this);
      this.onArenaPointerDown = this.onArenaPointerDown.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
    }

    bind(callbacks) {
      this.callbacks = callbacks;

      this.elements.startButton.addEventListener("click", this.onStartClick);
      this.elements.restartButton.addEventListener("click", this.onRestartClick);
      this.elements.gameArena.addEventListener("pointerdown", this.onArenaPointerDown);
      document.addEventListener("keydown", this.onKeyDown);
    }

    setGameplayEnabled(enabled) {
      this.gameplayEnabled = enabled;
      this.elements.gameArena.disabled = !enabled;
      this.elements.gameArena.classList.toggle("is-disabled", !enabled);
    }

    onStartClick() {
      this.callbacks.onStartRequest?.();
    }

    onRestartClick() {
      this.callbacks.onRestartRequest?.();
    }

    onArenaPointerDown(event) {
      event.preventDefault();

      if (!this.gameplayEnabled) {
        return;
      }

      this.callbacks.onArenaTap?.({
        source: "pointer",
        x: event.clientX,
        y: event.clientY,
      });
    }

    onKeyDown(event) {
      if (event.repeat) {
        return;
      }

      if (event.code === "Enter" || event.code === "Space") {
        event.preventDefault();
        this.callbacks.onPrimaryAction?.({
          source: "keyboard",
          code: event.code,
        });
      }
    }
  }

  window.ZeroPointThree.InputManager = InputManager;
})();
