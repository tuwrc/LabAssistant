const VERSION = "0.1.0";

console.info(
  `%c LABASSISTANT-CARDS %c v${VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);

class LabStatusCard extends HTMLElement {
  setConfig(config) {
    if (!config.entity) {
      throw new Error("lab-status-card: 'entity' is required");
    }
    this._config = config;
    this.innerHTML = `
      <ha-card>
        <div class="wrap">
          <div class="name"></div>
          <div class="state"></div>
        </div>
      </ha-card>
      <style>
        .wrap { padding: 16px; }
        .name { font-size: .85rem; letter-spacing: .04em;
                text-transform: uppercase;
                color: var(--secondary-text-color); }
        .state { font-size: 1.5rem; font-weight: 500;
                 color: var(--primary-text-color); }
      </style>
    `;
  }

  set hass(hass) {
    if (!this._config) return;
    const stateObj = hass.states[this._config.entity];
    this.querySelector(".name").textContent =
      this._config.name ||
      stateObj?.attributes.friendly_name ||
      this._config.entity;
    this.querySelector(".state").textContent = stateObj
      ? `${stateObj.state}${stateObj.attributes.unit_of_measurement ?? ""}`
      : "unavailable";
  }

  getCardSize() {
    return 2;
  }

  static getStubConfig() {
    return { entity: "" };
  }
}

customElements.define("lab-status-card", LabStatusCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "lab-status-card",
  name: "Lab Status Card",
  description: "Shows the state of a single entity.",
});
