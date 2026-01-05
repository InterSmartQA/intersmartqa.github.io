document.addEventListener('DOMContentLoaded', () => {
    // HEX to RGB Elements
    const hexInput = document.getElementById('hex-input');
    const rgbResult = document.getElementById('rgb-result').querySelector('span');
    const copyRgbBtn = document.getElementById('copy-rgb');
    const hexPreview = document.getElementById('hex-preview');

    // RGB to HEX Elements
    const rInput = document.getElementById('r-input');
    const gInput = document.getElementById('g-input');
    const bInput = document.getElementById('b-input');
    const hexResult = document.getElementById('hex-result').querySelector('span');
    const copyHexBtn = document.getElementById('copy-hex');
    const rgbPreview = document.getElementById('rgb-preview');

    // Helper: Component to Hex
    function componentToHex(c) {
        const hex = parseInt(c).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    // Helper: RGB to Hex
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    // Helper: Hex to RGB
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Update HEX to RGB
    hexInput.addEventListener('input', (e) => {
        let hex = e.target.value;
        if (!hex.startsWith('#') && hex.length > 0) {
            hex = '#' + hex;
        }

        const rgb = hexToRgb(hex);
        if (rgb) {
            const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            rgbResult.textContent = rgbString;
            hexPreview.style.backgroundColor = rgbString;
            hexInput.style.borderColor = 'var(--success)';
        } else {
            hexInput.style.borderColor = 'var(--border-color)';
            if (hex.length >= 4) { // Only show error hint if length is plausible
                // optional visual cue
            }
        }
    });

    // Update RGB to HEX
    function updateRgbToHex() {
        let r = Math.min(255, Math.max(0, parseInt(rInput.value) || 0));
        let g = Math.min(255, Math.max(0, parseInt(gInput.value) || 0));
        let b = Math.min(255, Math.max(0, parseInt(bInput.value) || 0));

        const hexString = rgbToHex(r, g, b);
        hexResult.textContent = hexString;
        rgbPreview.style.backgroundColor = hexString;
    }

    [rInput, gInput, bInput].forEach(input => {
        input.addEventListener('input', updateRgbToHex);
    });

    // Copy Buttons
    function setupCopy(btn, targetElement) {
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(targetElement.textContent).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            });
        });
    }

    setupCopy(copyRgbBtn, rgbResult);
    setupCopy(copyHexBtn, hexResult);
});
