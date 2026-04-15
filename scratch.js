const fs = require('fs');
const cssPath = 'src/app/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

const colors = {
    "on-secondary-fixed": "#002113",
    "surface-container-low": "#eff4ff",
    "surface-variant": "#d3e4fe",
    "on-tertiary-fixed-variant": "#6b3b00",
    "tertiary": "#894d00",
    "on-error-container": "#93000a",
    "on-secondary": "#ffffff",
    "primary-container": "#007bb9",
    "tertiary-container": "#ac6200",
    "on-primary-container": "#fdfcff",
    "error": "#ba1a1a",
    "secondary-fixed": "#6ffbbe",
    "surface-dim": "#cbdbf5",
    "tertiary-fixed-dim": "#ffb875",
    "tertiary-fixed": "#ffdcc0",
    "primary": "#006194",
    "surface-container-highest": "#d3e4fe",
    "surface-tint": "#006398",
    "on-primary-fixed": "#001d31",
    "surface-container-high": "#dce9ff",
    "secondary": "#006c49",
    "on-error": "#ffffff",
    "inverse-primary": "#93ccff",
    "on-primary": "#ffffff",
    "secondary-fixed-dim": "#4edea3",
    "inverse-on-surface": "#eaf1ff",
    "on-surface": "#0b1c30",
    "surface-bright": "#f8f9ff",
    "surface-container-lowest": "#ffffff",
    "on-tertiary-container": "#fffbff",
    "on-tertiary-fixed": "#2d1600",
    "surface-container": "#e5eeff",
    "error-container": "#ffdad6",
    "outline": "#707881",
    "on-primary-fixed-variant": "#004b73",
    "on-secondary-container": "#00714d",
    "outline-variant": "#bfc7d2",
    "secondary-container": "#6cf8bb",
    "primary-fixed-dim": "#93ccff",
    "inverse-surface": "#213145",
    "on-secondary-fixed-variant": "#005236",
    "on-tertiary": "#ffffff",
    "on-surface-variant": "#3f4850",
    "primary-fixed": "#cce5ff",
    "surface": "#f8f9ff"
};

let themeInject = '';
for (const [key, value] of Object.entries(colors)) {
    themeInject += `  --color-${key}: ${value};\n`;
}

css = css.replace('@theme inline {', `@theme inline {\n${themeInject}`);
css += `\n@layer utilities {\n  .clinical-shadow {\n    box-shadow: 0 12px 40px -12px rgba(11, 28, 48, 0.08);\n  }\n}\n`;

fs.writeFileSync(cssPath, css);
console.log('Update done');
