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


--------------------------------------------------
SWITCH SETTINGS SUPPORT
--------------------------------------------------
Switch cards now support the settings cog.

Options:
- show_settings: true
  Enables the cog icon on switch cards.

- settings_entity: switch.some_other_switch
  Allows the popup to control a different switch.

Popup behavior:
- Displays a simple On / Off control
- Uses switch.turn_on / switch.turn_off services


--------------------------------------------------
SWITCH: OPTIONAL SLIDER MODE
--------------------------------------------------
By default, switch entities use the vertical up/down toggle.

You can optionally display a vertical slider on a switch card that controls a DIFFERENT target entity.

Automatic behavior:
- If switch_slider_entity is set, the switch card becomes a slider card (controlling that target entity).
- If switch_slider_entity is not set, the switch card uses the default up/down toggle.
(e.g. a dimmable light, a fan, or an input_number). The power button and main on/off still control
the switch entity itself; the slider controls the target entity.

Options:
- switch_slider_entity: <entity_id>
  Used when switch slider mode: slider (if omitted, settings_entity is used if provided)

Examples:

1) Switch card with slider controlling a light:
switch_slider_entity: light.lamp_dimmer

2) Switch card with slider controlling a fan percentage:
switch_slider_entity: fan.ceiling_fan


NOTE
--------------------------------------------------
To enable slider mode for a switch, set:
  switch_slider_entity: <entity_id>
(or provide settings_entity as a fallback)
Otherwise the card will show a helpful message.


--------------------------------------------------
SWITCH VISUAL STYLE
--------------------------------------------------
Switch cards now use a tall pill-style toggle:
- Top half shows ON state (highlighted)
- Bottom half shows OFF state (dim)
- Center circle indicator
- Power icon at top when ON

Colors can be customized with CSS variables:
--switch-on-bg
--switch-on-bg-dim
--switch-off-bg


Switch color vars:
--switch-shell-bg
--switch-on-bg
--switch-on-bg-dim
--switch-off-bg
--switch-off-bg-on


Switch visual states:
- ON  → top half colored, bottom neutral
- OFF → both halves neutral

Switch pill color vars:
--switch-on-bg        (default #ffc107)
--switch-neutral-bg   (default #e6e6e6)
--switch-bg           (default #f2f2f2)


Switch pill colors (defaults):
--switch-wrapper-on:  #fff3cd
--switch-wrapper-off: #696969
--switch-btn-on:      #ffc107
--switch-btn-off:     #d9d9d9
