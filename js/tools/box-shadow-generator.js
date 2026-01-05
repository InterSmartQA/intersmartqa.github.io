document.addEventListener('DOMContentLoaded', () => {
    // Inputs
    const horizontalInput = document.getElementById('horizontal');
    const verticalInput = document.getElementById('vertical');
    const blurInput = document.getElementById('blur');
    const spreadInput = document.getElementById('spread');
    const colorInput = document.getElementById('color');
    const colorHexInput = document.getElementById('color-hex');
    const opacityInput = document.getElementById('opacity');
    const insetInput = document.getElementById('inset');

    // Value Displays
    const horizontalVal = document.getElementById('horizontal-val');
    const verticalVal = document.getElementById('vertical-val');
    const blurVal = document.getElementById('blur-val');
    const spreadVal = document.getElementById('spread-val');
    const opacityVal = document.getElementById('opacity-val');

    // Preview & Output
    const previewBox = document.getElementById('preview-box');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');

    function hexToRgba(hex, alpha) {
        let r = 0, g = 0, b = 0;

        // Handle 3-digit hex
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function updateShadow() {
        const h = horizontalInput.value;
        const v = verticalInput.value;
        const b = blurInput.value;
        const s = spreadInput.value;
        const c = colorInput.value;
        const o = opacityInput.value;
        const inset = insetInput.checked ? 'inset' : '';

        // Update labels
        horizontalVal.textContent = `${h}px`;
        verticalVal.textContent = `${v}px`;
        blurVal.textContent = `${b}px`;
        spreadVal.textContent = `${s}px`;
        opacityVal.textContent = o;
        colorHexInput.value = c;

        const rgba = hexToRgba(c, o);
        const boxShadow = `${inset} ${h}px ${v}px ${b}px ${s}px ${rgba}`.trim();

        previewBox.style.boxShadow = boxShadow;
        cssOutput.textContent = `box-shadow: ${boxShadow};`;

        // Also update webkit and moz for completeness in display (optional nowadays but good for tools)
        // cssOutput.innerText += `\n-webkit-box-shadow: ${boxShadow};`;
        // cssOutput.innerText += `\n-moz-box-shadow: ${boxShadow};`;
    }

    // Event Listeners
    const inputs = [horizontalInput, verticalInput, blurInput, spreadInput, colorInput, opacityInput, insetInput];
    inputs.forEach(input => {
        input.addEventListener('input', updateShadow);
    });

    // Sync Text Input for Color
    colorHexInput.addEventListener('input', (e) => {
        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
            colorInput.value = e.target.value;
            updateShadow();
        }
    });

    // Copy to Clipboard
    copyBtn.addEventListener('click', () => {
        const code = cssOutput.textContent; // Copy only the text content
        navigator.clipboard.writeText(code).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    });

    // Initialize
    updateShadow();
});
