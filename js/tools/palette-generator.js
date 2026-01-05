// Palette Generator

(function () {
    'use strict';

    let paletteContainer;

    const init = () => {
        paletteContainer = document.getElementById('palette-container');
        document.getElementById('btn-generate').addEventListener('click', generatePalette);
        generatePalette(); // Generate one on load
    };

    const generatePalette = () => {
        paletteContainer.innerHTML = '';

        // Generate 5 random colors
        for (let i = 0; i < 5; i++) {
            const color = getRandomColor();
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color-swatch';
            colorDiv.style.backgroundColor = color;
            colorDiv.style.flex = '1';
            colorDiv.style.height = '150px';
            colorDiv.style.display = 'flex';
            colorDiv.style.flexDirection = 'column';
            colorDiv.style.alignItems = 'center';
            colorDiv.style.justifyContent = 'center';
            colorDiv.style.cursor = 'pointer';
            colorDiv.style.position = 'relative';

            const text = document.createElement('span');
            text.textContent = color;
            text.style.color = getContrastColor(color);
            text.style.fontWeight = 'bold';
            text.style.fontFamily = 'monospace';
            text.style.background = 'rgba(0,0,0,0.1)';
            text.style.padding = '4px 8px';
            text.style.borderRadius = '4px';

            colorDiv.appendChild(text);

            colorDiv.addEventListener('click', () => {
                navigator.clipboard.writeText(color);
                const originalText = text.textContent;
                text.textContent = 'Copied!';
                setTimeout(() => text.textContent = originalText, 1500);
            });

            paletteContainer.appendChild(colorDiv);
        }
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getContrastColor = (hex) => {
        // simple YIQ contrast
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
