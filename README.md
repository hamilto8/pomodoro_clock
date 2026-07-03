# Premium Pomodoro Clock

A modern, responsive, and highly polished Pomodoro Clock built with vanilla web technologies. It features a stunning glassmorphic dark-theme UI, an SVG-based circular countdown progress ring, a twinkling background star field, and browser-native sound notifications.

![Pomodoro Clock UI Mockup](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80) <!-- Dynamic abstract design representation -->

## Features

- 🕒 **Sleek Glassmorphic Design**: Frosted glass panels with subtle border glows, backdrop filters, and vibrant color gradients.
- 🔄 **Circular Progress Indicator**: An SVG-based dynamic progress ring that shrinks gracefully as time counts down.
- 🎨 **Adaptive Theme Modes**: The UI transitions automatically between a sunset-orange **Session Mode** and an emerald-green **Break Mode**.
- 🔔 **Synthesized Audio Chimes**: Uses the HTML5 **Web Audio API** to generate pleasant, browser-native double-chime alarm tones when transitioning between sessions, eliminating the need for heavy external audio assets.
- ✨ **Twinkling Background**: A procedurally generated background starry sky with CSS-pulsing animations.
- 📱 **Fully Responsive Layout**: Built with CSS Grid and Flexbox to scale seamlessly across desktops, tablets, and mobile devices.
- ♿ **Accessibility First**: Designed with semantic markup, proper keyboard focus behaviors, and interactive ARIA labels/states.

## How to Use

Since this is a lightweight static web application, no installation or build steps are required:

1. Clone this repository:
   ```bash
   git clone https://github.com/hamilto8/pomodoro_clock.git
   ```
2. Navigate into the project folder:
   ```bash
   cd pomodoro_clock
   ```
3. Open the `index.html` file in any modern web browser:
   - On macOS: `open index.html`
   - On Linux: `xdg-open index.html`
   - On Windows: `start index.html`
   - Alternatively, double-click `index.html` in your file explorer.

## Project Structure

```text
pomodoro_clock/
├── index.html   # HTML5 structure, typography, SVG layouts, and semantic elements
├── index.css    # Responsive styling, visual themes, custom keyframes, and tokens
├── index.js     # State management, Web Audio API synthesizer, and page interactions
└── README.md    # Documentation and usage guide
```

## Technologies Used

- **Markup**: HTML5, SVG (for the progress circle)
- **Styling**: Vanilla CSS (Custom Properties, Grid, Flexbox, Glassmorphism, Keyframes)
- **Scripting**: Modern Vanilla JavaScript (ES6+, Web Audio API)

## Customization

### Adjusting Time Limits
By default, Session and Break times can be set between 1 and 60 minutes. To change these bounds, modify the values in `index.js`:
```javascript
// Example: Modify inside changeLength() limits
if (sessionTime < 90) { ... } // Change max session length
```

### Customizing Sounds
The chime tones are synthesized dynamically. You can adjust the frequencies (in Hertz) or durations in `index.js` inside the `playAlarmSound()` function:
```javascript
// Modify note frequencies (e.g. 880Hz to 440Hz transition)
osc1.frequency.setValueAtTime(880, now);
```

## License

This project is open source and available under the [MIT License](LICENSE).

---
*Original version created in 2019 by Michael Hamilton. Refactored and modernized in 2026.*
