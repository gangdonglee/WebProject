window.ZeroPointThree = window.ZeroPointThree || {};

(() => {
  class SaveManager {
    constructor(storageKey) {
      this.storageKey = storageKey;
      this.memoryBestScore = 0;
    }

    getBestScore() {
      try {
        const rawValue = window.localStorage.getItem(this.storageKey);
        const parsed = Number.parseInt(rawValue ?? "0", 10);
        return Number.isFinite(parsed) ? parsed : 0;
      } catch (error) {
        return this.memoryBestScore;
      }
    }

    saveBestScore(score) {
      const nextBestScore = Math.max(this.getBestScore(), score);

      try {
        window.localStorage.setItem(this.storageKey, String(nextBestScore));
      } catch (error) {
        this.memoryBestScore = nextBestScore;
      }

      return nextBestScore;
    }
  }

  window.ZeroPointThree.SaveManager = SaveManager;
})();
