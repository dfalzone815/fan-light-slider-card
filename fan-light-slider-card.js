
import { LitElement, html, css, nothing } from "https://unpkg.com/lit@2.8.0/index.js?module";

class FanLightSliderCard extends LitElement {
  static properties = { hass: {}, config: {} };

  static styles = css`
    :host {
      /* Shared control geometry (fan panel + light slider wrapper) */
      --control-width: 120px;
      --control-radius: 28px;
      --control-padding: 5px;
      --control-height: 300px;

      /* Colors */
      --slider-light-color: #ffc107;
      --slider-fan-color: #00bcd4;

      --slider-light-secondary: #fff3cd;
      --slider-fan-secondary: #ccf1f7;

      --slider-off-color: #d3d3d3;
      --slider-thumb-color: #ffffff;

      /* Fan panel colors */
      --fan-panel-off: #d9d9d9;
      --fan-panel-on: #dff4f8;
      --fan-active: #00bcd4;
      --fan-icon-color: #000000;
      --fan-active-text: #ffffff;

      /* Light slider sizing */
      --pill-padding: 0px;
      --track-radius: 10px;
      --thumb-width: 36px;
      --thumb-height: 6px;

      /* Power + Cog */
      --power-bg: #e0e0e0;
      --power-icon-color: #000000;

      --cog-bg: #e0e0e0;
      --cog-icon-color: #000000;
      --cog-size: 35px;

      /* Modal */
      --dlg-slider-width: 250px;
      --dlg-slider-height: 50px;
      --dlg-icon-size: 34px;
      --dlg-gap: 10px;
      --dlg-icon-bg: #e0e0e0;
    }

    ha-card { padding: 16px; height: 100%; }


    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 6px;
    }

    .header .title {
      margin: 0;
      flex: 1 1 auto;
    }

    .title {
      font-size: 22px;
      font-weight: 500;
      text-align: left;
      line-height: 1.15;
      margin: 0 0 6px 0;
    }

    .value {
      font-size: 26px;
      text-align: center;
      margin: 4px 0 10px 0;
    }

    /* ---------- Vertical Slider UI ---------- */
    .slider-wrapper {
      height: var(--control-height);
      width: var(--control-width);
      margin: 0 auto;
      background: #f6f6f6;
      border-radius: var(--control-radius);
      padding: var(--pill-padding);
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }

    .slider-wrapper {
      --track-size: calc(var(--control-width) - (2 * var(--pill-padding)));
      --inner-height: calc(var(--control-height) - (2 * var(--pill-padding)));
    }

    input.vslider {
      -webkit-appearance: none;
      appearance: none;

      width: var(--inner-height);
      height: var(--track-size);

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(-90deg);
      transform-origin: center;

      background: transparent;
      outline: none;
      margin: 0;
      padding: 0;
      border: 0;
      z-index: 1;
    }

    input.vslider::-webkit-slider-runnable-track {
      height: var(--track-size);
      border-radius: var(--track-radius);
      background: linear-gradient(
        to right,
        var(--fill-color) var(--pct),
        var(--secondary-color) var(--pct)
      );
    }

    input.vslider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 0px;
      height: 0px;
      border: 0;
      background: transparent;
      box-shadow: none;
    }

    input.vslider::-moz-range-track {
      height: var(--track-size);
      border-radius: var(--track-radius);
      background: var(--secondary-color);
      border: 0;
    }

    input.vslider::-moz-range-progress {
      height: var(--track-size);
      border-radius: var(--track-radius);
      background: var(--fill-color);
      border: 0;
    }

    input.vslider::-moz-range-thumb {
      width: 0px;
      height: 0px;
      border: 0;
      background: transparent;
    }

    .thumb {
      position: absolute;
      left: 50%;
      width: var(--thumb-width);
      height: var(--thumb-height);
      transform: translateX(-50%);
      border-radius: 3px;
      background: var(--slider-thumb-color);
      z-index: 2;
      pointer-events: none;
    }

    /* ---------- Fan Buttons Panel UI ---------- */
    .fan-panel {
      width: var(--control-width);
      margin: 0 auto;
      padding: var(--control-padding);
      border-radius: var(--control-radius);
      background: var(--fan-panel-bg);
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: stretch;
      box-sizing: border-box;
      min-height: var(--control-height);
      justify-content: center;
    }

    .fan-item {
      border-radius: 20px;
      padding: 10px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      text-align: center;
      gap: 2px;
      background: transparent;
    }

    .fan-item ha-icon {
      color: var(--fan-icon-color);
      --mdc-icon-size: 28px;
    }

    .fan-panel.nolabels .fan-item ha-icon {
      --mdc-icon-size: 36px;
    }

    .fan-item .label {
      font-size: 14px;
      color: var(--fan-icon-color);
    }

    .fan-item.active { background: var(--fan-active); }
    .fan-item.active ha-icon,
    .fan-item.active .label { color: var(--fan-active-text); }

    .lswitch .cap {
      position: absolute;
      inset: 0;
      background: var(--secondary-color);
      opacity: 1;
    }

    .lswitch.on .cap {
      background: var(--fill-color);
    }

    .lswitch .content {
      position: relative;
      z-index: 1;
      width: calc(100% - 12px);
      height: calc(100% - 12px);
      border-radius: calc(var(--control-radius) - 6px);
      background: rgba(255,255,255,0.55);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      box-sizing: border-box;
    }

    .lswitch ha-icon {
      color: var(--power-icon-color);
      --mdc-icon-size: 38px;
    }

    .lswitch .state {
      font-size: 18px;
      font-weight: 700;
      color: var(--power-icon-color);
    }



    /* ---------- Switch up/down toggle (switch.* entities) ---------- */
    .stoggle {
      height: var(--control-height);
      width: var(--control-width);
      margin: 0 auto;
      background: #f6f6f6;
      border-radius: var(--control-radius);
      padding: var(--pill-padding);
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .stoggle .seg {
      flex: 1 1 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      position: relative;
    }

    .stoggle .seg.top { border-top-left-radius: calc(var(--control-radius) - 2px); border-top-right-radius: calc(var(--control-radius) - 2px); }
    .stoggle .seg.bottom { border-bottom-left-radius: calc(var(--control-radius) - 2px); border-bottom-right-radius: calc(var(--control-radius) - 2px); }

    /* inactive segment */
    .stoggle .seg {
      background: #ebebeb;
    }

    /* active segment */
    .stoggle.on .seg.top { background: var(--fill-color); }
    .stoggle.on .seg.bottom { background: #ebebeb; }

    .stoggle.off .seg.top { background: #ebebeb; }
    .stoggle.off .seg.bottom { background: #9e9e9e; }

    /* center indicator */
    .stoggle .indicator {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 14px;
      height: 14px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: transparent;
      border: 2px solid rgba(255,255,255,0.9);
      box-sizing: border-box;
      pointer-events: none;
      z-index: 2;
    }

    .stoggle.on .indicator { border-color: rgba(255,255,255,0.9); }
    .stoggle.off .indicator { border-color: rgba(255,255,255,0.9); }


    /* ---------- Footer buttons ---------- */
    .footer {
      margin-top: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      min-height: 46px;
    }

    .power {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: var(--power-bg);
    }
    .power ha-icon { color: var(--power-icon-color); }

    .cog {
      width: var(--cog-size);
      height: var(--cog-size);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: var(--cog-bg);
      box-sizing: border-box;
      flex: 0 0 auto;
    }
    .cog ha-icon { color: var(--cog-icon-color); }

    /* ---------- Custom modal (in-shadow DOM, reliable slider styling) ---------- */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.35);
      z-index: 9999;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 40px;
      box-sizing: border-box;
    }

    .modal {
      --dlg-content-width: calc(var(--dlg-icon-size) + var(--dlg-gap) + var(--dlg-slider-width));
      width: calc((var(--dlg-content-width) * 1.1) + 32px);
      border-radius: 20px;
      background: var(--card-background-color, #ffffff);
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      padding: 14px 16px 18px 16px;
      box-sizing: border-box;
      pointer-events: auto;
    }

    .modal-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .modal-title {
      font-size: 18px;
      font-weight: 600;
      flex: 1;
    }

    .modal-close {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--dlg-icon-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex: 0 0 auto;
    }

    .modal-close ha-icon {
      color: var(--power-icon-color);
      --mdc-icon-size: 18px;
    }

    .modal-row {
      display: flex;
      align-items: center;
      gap: var(--dlg-gap);
      margin-top: 14px;
    }

    .modal-ico {
      width: var(--dlg-icon-size);
      height: var(--dlg-icon-size);
      border-radius: 50%;
      background: var(--dlg-icon-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
    }

    .modal-ico ha-icon {
      color: var(--power-icon-color);
      --mdc-icon-size: 18px;
    }

    input.hslider {
      width: var(--dlg-slider-width);
      height: var(--dlg-slider-height);
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      margin: 0;
      padding: 0;
      flex: 0 0 var(--dlg-slider-width);
      writing-mode: horizontal-tb;
      direction: ltr;
      display: block;
    }

    input.hslider::-webkit-slider-runnable-track {
      height: var(--dlg-slider-height);
      border-radius: 10px;
    }

    input.hslider.color::-webkit-slider-runnable-track {
      background: linear-gradient(to right,
        rgb(255,0,0),
        rgb(255,255,0),
        rgb(0,255,0),
        rgb(0,255,255),
        rgb(0,0,255),
        rgb(255,0,255),
        rgb(255,0,0)
      );
    }

    input.hslider.temp::-webkit-slider-runnable-track {
      background: linear-gradient(to right, #90caf9, #fffde7, #ffb74d);
    }

    input.hslider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: var(--dlg-slider-height);
      border-radius: 10px;
      background: rgba(255,255,255,0.9);
      border: 2px solid rgba(0,0,0,0.15);
      box-sizing: border-box;
    }

    /* Firefox */
    input.hslider::-moz-range-track {
      height: var(--dlg-slider-height);
      border-radius: 10px;
    }

    input.hslider.color::-moz-range-track {
      background: linear-gradient(to right,
        rgb(255,0,0),
        rgb(255,255,0),
        rgb(0,255,0),
        rgb(0,255,255),
        rgb(0,0,255),
        rgb(255,0,255),
        rgb(255,0,0)
      );
    }

    input.hslider.temp::-moz-range-track {
      background: linear-gradient(to right, #90caf9, #fffde7, #ffb74d);
    }

    input.hslider::-moz-range-thumb {
      width: 18px;
      height: calc(var(--dlg-slider-height) - 4px);
      border-radius: 10px;
      background: rgba(255,255,255,0.9);
      border: 2px solid rgba(0,0,0,0.15);
      box-sizing: border-box;
    }
  `;

  constructor() {
    super();
    this._dlgOpen = false;
    this._hueDraft = 0;
    this._ctDraft = 0;
  }

  setConfig(config) {
    if (!config?.entity) throw new Error("Entity required");
    this.config = config;
  }

  _isFan(id) { return (id || "").startsWith("fan."); }
  _isLight(id) { return (id || "").startsWith("light."); }
  _isSwitch(id) { return (id || "").startsWith("switch."); }

  _css(name, fallback) {
    const v = getComputedStyle(this).getPropertyValue(name);
    return v && v.trim() ? v.trim() : fallback;
  }

  _settingsEntityId() {
    return this.config.settings_entity || this.config.entity;
  }

  _openDialog = () => { this._dlgOpen = true; this.requestUpdate(); };
  _closeDialog = () => { this._dlgOpen = false; this.requestUpdate(); };

  _initDialogDraft(entity) {
    const hs = entity?.attributes?.hs_color;
    if (Array.isArray(hs) && hs.length >= 1) this._hueDraft = Math.round(Number(hs[0]) || 0);
    else this._hueDraft = 0;

    const ct = entity?.attributes?.color_temp;
    if (ct != null) this._ctDraft = Math.round(Number(ct) || 0);
    else {
      const min = entity?.attributes?.min_mireds ?? 153;
      const max = entity?.attributes?.max_mireds ?? 500;
      this._ctDraft = Math.round((Number(min) + Number(max)) / 2);
    }
  }

  _onHueInput = (e) => { this._hueDraft = Number(e.target.value); this.requestUpdate(); };
  _onCtInput = (e) => { this._ctDraft = Number(e.target.value); this.requestUpdate(); };

  _applyHue = () => {
    const id = this._settingsEntityId();
    const ent = this.hass.states[id];
    const sat = (ent?.attributes?.hs_color && ent.attributes.hs_color.length > 1) ? Number(ent.attributes.hs_color[1]) : 100;
    this.hass.callService("light", "turn_on", { entity_id: id, hs_color: [Number(this._hueDraft), sat] });
  };

  _applyCt = () => {
    const id = this._settingsEntityId();
    this.hass.callService("light", "turn_on", { entity_id: id, color_temp: Number(this._ctDraft) });
  };

  _getPct(entity, isFan, isOn) {
    if (this._isSwitch(entity?.entity_id)) return 0;
    if (!isOn) return 0;
    if (!isFan && entity?.attributes?.brightness != null) {
      return Math.round((entity.attributes.brightness / 255) * 100);
    }
    if (entity?.attributes?.percentage != null) return Number(entity.attributes.percentage) || 0;
    return 0;
  }

  _thumbBottomPx(pct) {
    const h = Number.parseFloat(String(this.config.control_height ?? this._css("--control-height", "300px")).replace("px","")) || 300;
    const pad = Number.parseFloat(String(this.config.pill_padding ?? this._css("--pill-padding", "1px")).replace("px","")) || 1;
    const th = Number.parseFloat(String(this.config.thumb_height ?? this._css("--thumb-height", "6px")).replace("px","")) || 6;

    const inner = Math.max(0, h - (2 * pad));
    const y = pad + (pct / 100) * inner;
    const bottom = Math.max(pad, Math.min(pad + inner, y)) - (th / 2);
    return bottom;
  }

  _computePrimaryColor(entity, isFan, isOn) {
    const off = this.config.slider_off_color ?? this._css("--slider-off-color", "#d3d3d3");
    if (!isOn) return off;

    if (this.config.slider_color) return this.config.slider_color;

    if (!isFan && this.config.sync_light_color === true && entity?.attributes?.hs_color) {
      const h = entity.attributes.hs_color[0];
      return `hsl(${h},100%,50%)`;
    }

    if (isFan) return this.config.slider_fan_color ?? this._css("--slider-fan-color", "#00bcd4");
    return this.config.slider_light_color ?? this._css("--slider-light-color", "#ffc107");
  }

  _computeSecondaryColor(isFan, isOn) {
    const off = this.config.slider_off_color ?? this._css("--slider-off-color", "#d3d3d3");
    if (!isOn) return off;

    if (this.config.slider_secondary_color) return this.config.slider_secondary_color;
    if (isFan) return this.config.slider_fan_secondary ?? this._css("--slider-fan-secondary", "#ccf1f7");
    return this.config.slider_light_secondary ?? this._css("--slider-light-secondary", "#fff3cd");
  }

  _fanSpeedCount(entity) {
    const max = Number(this.config.max_fan_speeds ?? 4);
    const sc = Number(entity?.attributes?.speed_count);
    if (Number.isFinite(sc) && sc > 0) return Math.min(sc, max);
    const step = Number(entity?.attributes?.percentage_step);
    if (Number.isFinite(step) && step > 0) {
      const inferred = Math.round(100 / step);
      if (inferred > 0) return Math.min(inferred, max);
    }
    return Math.min(4, max);
  }

  _fanStepPct(speedCount) { return 100 / speedCount; }

  _fanLevelFromPct(pct, speedCount) {
    if (pct <= 0) return 0;
    const step = this._fanStepPct(speedCount);
    const level = Math.round(pct / step);
    return Math.max(1, Math.min(speedCount, level));
  }

  _fanIconForLevel(level) {
    if (level === 1) return "mdi:fan-speed-1";
    if (level === 2) return "mdi:fan-speed-2";
    if (level === 3) return "mdi:fan-speed-3";
    return "mdi:fan";
  }

  render() {
    if (!this.hass || !this.config) return nothing;
    const entity = this.hass.states[this.config.entity];
    if (!entity) return html`<ha-card><div style="padding:16px">Entity not found: ${this.config.entity}</div></ha-card>`;

    const isFan = this._isFan(entity.entity_id);
    const isSwitch = this._isSwitch(entity.entity_id);
    const isOn = entity.state !== "off";

    const pct = this._getPct(entity, isFan, isOn);
    const label = isSwitch ? (isOn ? "On" : "Off") : (isOn ? `${pct}%` : "Off");

    const title = this.config.title || entity.attributes.friendly_name || this.config.entity;
    const powerIcon = this.config.power_icon || "mdi:power";

    const showSettings = this._isLight(entity.entity_id) && (this.config.show_settings === true);
    const cogIcon = this.config.cog_icon || "mdi:cog";

    const controlWidth = this.config.control_width;
    const controlRadius = this.config.control_radius;
    const controlPadding = this.config.control_padding;
    const controlHeight = this.config.control_height;

    const powerBg = this.config.power_bg ?? this._css("--power-bg", "#e0e0e0");
    const powerIconColor = this.config.power_icon_color ?? this._css("--power-icon-color", "#000000");

    const primary = this._computePrimaryColor(entity, isFan, isOn);
    const secondary = this._computeSecondaryColor(isFan, isOn);
    const thumbBottom = this._thumbBottomPx(pct);

    const fanControl = (this.config.fan_control || "slider").toLowerCase();
    const speedCount = isFan ? this._fanSpeedCount(entity) : 0;
    const currentLevel = isFan ? (isOn ? this._fanLevelFromPct(pct, speedCount) : 0) : 0;
    const fanShowLabels = this.config.fan_show_labels === true;

    const panelOff = this.config.fan_panel_off ?? this._css("--fan-panel-off", "#d9d9d9");
    const panelOn = this.config.fan_panel_on ?? this._css("--fan-panel-on", "#dff4f8");
    const activeColor = this.config.fan_active ?? this._css("--fan-active", "#00bcd4");
    const fanIconColor = (isOn ? (this.config.fan_icon_color ?? this._css("--fan-icon-color", "#000000")) : (this.config.fan_icon_color_off ?? "#696969"));
    const panelBg = isOn ? panelOn : panelOff;

    const cardStyle = [
      `--power-bg:${powerBg}`,
      `--power-icon-color:${powerIconColor}`,

      `--cog-bg:${this.config.cog_bg ?? this._css("--cog-bg", "#e0e0e0")}`,
      `--cog-icon-color:${this.config.cog_icon_color ?? this._css("--cog-icon-color", "#000000")}`,
      this.config.cog_size ? `--cog-size:${this.config.cog_size}` : "",

      `--dlg-icon-bg:${this.config.dlg_icon_bg ?? "var(--power-bg)"}`,
      this.config.dlg_slider_width ? `--dlg-slider-width:${this.config.dlg_slider_width}` : "",
      this.config.dlg_slider_height ? `--dlg-slider-height:${this.config.dlg_slider_height}` : "",

      `--fill-color:${primary}`,
      `--secondary-color:${secondary}`,
      `--pct:${pct}%`,

      `--fan-panel-bg:${panelBg}`,
      `--fan-active:${activeColor}`,
      `--fan-icon-color:${fanIconColor}`,

      controlWidth ? `--control-width:${controlWidth}` : "",
      controlRadius ? `--control-radius:${controlRadius}` : "",
      controlPadding ? `--control-padding:${controlPadding}` : "",
      controlHeight ? `--control-height:${controlHeight}` : "",

      this.config.pill_padding ? `--pill-padding:${this.config.pill_padding}` : "",
      this.config.track_radius ? `--track-radius:${this.config.track_radius}` : "",
      this.config.thumb_width ? `--thumb-width:${this.config.thumb_width}` : "",
      this.config.thumb_height ? `--thumb-height:${this.config.thumb_height}` : "",
    ].filter(Boolean).join(";");

    const fanButtonsUI = html`
      <div class="fan-panel ${fanShowLabels ? "" : "nolabels"}" aria-label="Fan speed panel">
        ${Array.from({ length: speedCount }, (_, idx) => {
          const level = speedCount - idx;
          const icon = this._fanIconForLevel(level);
          const active = isOn && level === currentLevel;
          const step = this._fanStepPct(speedCount);
          const targetPct = Math.round(level * step);
          return html`
            <div class="fan-item ${active ? "active" : ""}"
                 title="Set fan to ${targetPct}%"
                 @click=${() => this._setFanPct(targetPct)}>
              <ha-icon .icon=${icon}></ha-icon>
              ${fanShowLabels ? html`<div class="label">${level}</div>` : nothing}
            </div>
          `;
        })}
      </div>
    `;

    const sliderUI = (isSwitch) ? html`
      <div class="stoggle ${isOn ? "on" : "off"}" aria-label="Switch toggle">
        <div class="seg top" @click=${() => this._setSwitch(true)} role="button" tabindex="0" aria-label="Turn on"></div>
        <div class="seg bottom" @click=${() => this._setSwitch(false)} role="button" tabindex="0" aria-label="Turn off"></div>
        <div class="indicator"></div>
      </div>
    ` : html`
      <div class="slider-wrapper" aria-label="Vertical slider">
        <div class="thumb" style="bottom:${thumbBottom}px"></div>
        <input class="vslider" type="range" min="0" max="100" .value=${String(pct)}
               @input=${this._onVSliderInput} @change=${this._onVSliderCommit} />
      </div>
    `;

    return html`
      <ha-card style="${cardStyle}">
        <div class="header">
          <div class="title">${title}</div>
                    ${showSettings ? html`
            <div class="cog" @click=${() => { const sid = this._settingsEntityId(); const se = this.hass.states[sid]; if (se) this._initDialogDraft(se); this._openDialog(); }}
                 role="button" tabindex="0" aria-label="Open light settings">
              <ha-icon .icon=${cogIcon}></ha-icon>
            </div>
          ` : nothing}
        </div>
        <div class="value">${label}</div>

        ${isFan && fanControl === "buttons" ? fanButtonsUI : sliderUI}

        <div class="footer">
          
          <div class="power" @click=${this._toggle} role="button" tabindex="0" aria-label="Toggle power">
            <ha-icon .icon=${powerIcon}></ha-icon>
          </div>
        </div>

        ${showSettings && this._dlgOpen ? html`
          <div class="modal-backdrop" @click=${this._closeDialog}>
            <div class="modal" @click=${(e) => e.stopPropagation()}>
              <div class="modal-header">
                <div class="modal-close" @click=${this._closeDialog} role="button" tabindex="0" aria-label="Close">
                  <ha-icon icon="mdi:close"></ha-icon>
                </div>
                <div class="modal-title">Light settings</div>
              </div>

              ${(() => {
                const sid = this._settingsEntityId();
                const se = this.hass.states[sid];
                if (!se) return html`<div>Entity not found: ${sid}</div>`;
                const minM = se.attributes.min_mireds ?? 153;
                const maxM = se.attributes.max_mireds ?? 500;
                return html`
                  <div class="modal-row">
                    <div class="modal-ico"><ha-icon icon="mdi:palette"></ha-icon></div>
                    <input aria-label="Color" class="hslider color" type="range" min="0" max="360" step="1"
                           .value=${String(this._hueDraft)}
                           @input=${this._onHueInput}
                           @change=${() => this._applyHue()} />
                  </div>

                  <div class="modal-row">
                    <div class="modal-ico"><ha-icon icon="mdi:thermometer"></ha-icon></div>
                    <input aria-label="Temperature" class="hslider temp" type="range" .min=${minM} .max=${maxM} step="1"
                           .value=${String(this._ctDraft)}
                           @input=${this._onCtInput}
                           @change=${() => this._applyCt()} />
                  </div>
                `;
              })()}
            </div>
          </div>
        ` : nothing}
      </ha-card>
    `;
  }

  _onVSliderInput = (e) => {
    const v = Number(e.target.value);
    const thumb = this.renderRoot?.querySelector(".thumb");
    if (thumb) thumb.style.bottom = `${this._thumbBottomPx(v)}px`;
  };

  _onVSliderCommit = (e) => {
    const entity = this.hass.states[this.config.entity];
    const isFan = this._isFan(entity.entity_id);
    const isSwitch = this._isSwitch(entity.entity_id);
    const val = Number(e.target.value);

    if (isSwitch) {
      // no-op (switch uses toggle UI)
      return;
    }

    if (isFan) {
      this.hass.callService("fan", "set_percentage", { entity_id: this.config.entity, percentage: val });
    } else {
      this.hass.callService("light", "turn_on", { entity_id: this.config.entity, brightness_pct: val });
    }
  };

  _setFanPct(pct) {
    this.hass.callService("fan", "set_percentage", { entity_id: this.config.entity, percentage: pct });
  }

  _toggle = () => {
    const entity = this.hass.states[this.config.entity];
    const isFan = this._isFan(entity.entity_id);
    const isSwitch = this._isSwitch(entity.entity_id);
    const isOn = entity.state !== "off";
    const domain = isSwitch ? "switch" : (isFan ? "fan" : "light");
    this.hass.callService(domain, isOn ? "turn_off" : "turn_on", { entity_id: this.config.entity });
  };

  getCardSize() { return 4; }
}

customElements.define("fan-light-slider-card", FanLightSliderCard);
