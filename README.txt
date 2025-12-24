README.txt
Fan Light Slider Card

--------------------------------------------------
OVERVIEW
--------------------------------------------------
fan-light-slider-card is a custom Home Assistant Lovelace card that provides:
- Vertical slider UI for lights (brightness) and fans (percentage)
- Optional fan speed buttons panel
- Vertical up/down toggle UI for switch entities
- Optional light settings popup (color + temperature) via a cog button

Entity type behavior:
- light.*  → vertical brightness slider (0–100)
- fan.*    → slider OR buttons (fan_control)
- switch.* → vertical up/down toggle (top=ON, bottom=OFF)

--------------------------------------------------
INSTALLATION
--------------------------------------------------
1) Copy fan-light-slider-card.js to:
   /config/www/fan-light-slider-card.js

2) Add as a Lovelace resource:
   resources:
     - url: /local/fan-light-slider-card.js
       type: module

3) Reload resources / refresh browser cache.

--------------------------------------------------
BASIC USAGE
--------------------------------------------------
type: custom:fan-light-slider-card
entity: light.bedroom_light

--------------------------------------------------
AVAILABLE OPTIONS
--------------------------------------------------

GENERAL
- title
  Override card title (default: entity friendly_name)

LIGHT
- show_settings: true|false
  Show the cog icon (top-right) to open the light settings popup.
  Default: false

- settings_entity: light.some_other_light
  Targets a different light for the popup controls (default: card entity).

- sync_light_color: true|false
  If true, slider primary color tracks the bulb’s current HS color.
  Default: false (uses default light slider colors)

FAN
- fan_control: slider|buttons
  Default: slider

- fan_show_labels: true|false
  Shows labels on fan speed buttons (when fan_control: buttons).
  Default: false

- max_fan_speeds: number
  Caps detected speed count (default: 4).

- fan_icon_color: "#RRGGBB"
  Fan icon color when fan is ON (default: #000000).

- fan_icon_color_off: "#RRGGBB"
  Fan icon color when fan is OFF (default: #696969).

LAYOUT / SIZING (applies to slider wrapper, fan panel, and switch toggle)
- control_width: 120px (default)
- control_height: 300px (default)
- control_radius: 28px (default)
- control_padding: 10px (default)

SLIDER LOOK & FEEL
- slider_light_color: "#ffc107" (default)
- slider_light_secondary: "#fff3cd" (default)
- slider_fan_color: "#00bcd4" (default)
- slider_fan_secondary: "#ccf1f7" (default)
- slider_off_color: "#d3d3d3" (default)

- thumb_width: 36px (default)
- thumb_height: 6px (default)
- track_radius: 10px (default)
- pill_padding: 1px (default)

BUTTONS
- power_icon: mdi:power (default)
- power_bg: "#e0e0e0" (default)
- power_icon_color: "#000000" (default)

COG / SETTINGS BUTTON
- cog_icon: mdi:cog (default)
- cog_size: 39px (default)
- cog_bg: "#e0e0e0" (default)
- cog_icon_color: "#000000" (default)

POPUP (LIGHT SETTINGS) STYLING
- dlg_slider_width: 250px (default)
- dlg_slider_height: 50px (default)
- dlg_icon_bg: "#e0e0e0" (default)

--------------------------------------------------
EXAMPLES
--------------------------------------------------

LIGHT WITH SETTINGS POPUP
type: custom:fan-light-slider-card
entity: light.chloes_room
show_settings: true

LIGHT WITH COLOR SYNC
type: custom:fan-light-slider-card
entity: light.living_room
show_settings: true
sync_light_color: true

FAN WITH SPEED BUTTONS
type: custom:fan-light-slider-card
entity: fan.master_bedroom
fan_control: buttons
fan_show_labels: true

SWITCH (UP/DOWN TOGGLE)
type: custom:fan-light-slider-card
entity: switch.garage_lights

--------------------------------------------------
END OF FILE
--------------------------------------------------
