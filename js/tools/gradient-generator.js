// CSS Gradient Generator

(function () {
    'use strict';

    let previewBox, cssOutput, color1Input, color2Input, angleSlider, angleValue;

    const init = () => {
        previewBox = document.getElementById('gradient-preview');
        cssOutput = document.getElementById('css-output');
        color1Input = document.getElementById('color1');
        color2Input = document.getElementById('color2');
        angleSlider = document.getElementById('angle');
        angleValue = document.getElementById('angle-value');

        color1Input.addEventListener('input', updateGradient);
        color2Input.addEventListener('input', updateGradient);
        angleSlider.addEventListener('input', () => {
            angleValue.textContent = angleSlider.value + '°';
            updateGradient();
        });

        document.getElementById('btn-copy').addEventListener('click', copyCSSCode);
        document.getElementById('btn-random').addEventListener('click', randomGradient);

        // Load presets
        document.querySelectorAll('.preset').forEach(preset => {
            preset.addEventListener('click', () => loadPreset(preset));
        });

        updateGradient();
    };

    const updateGradient = () => {
        const color1 = color1Input.value;
        const color2 = color2Input.value;
        const angle = angleSlider.value;

        const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        previewBox.style.background = gradient;
        cssOutput.textContent = `background: ${gradient};`;
    };

    const copyCSSCode = async () => {
        const css = cssOutput.textContent;

        try {
            await navigator.clipboard.writeText(css);
            const btn = document.getElementById('btn-copy');
            btn.textContent = '✓ Copied!';
            setTimeout(() => {
                btn.textContent = '📋 Copy CSS';
            }, 2000);
        } catch (error) {
            alert('Failed to copy CSS code');
        }
    };

    const randomGradient = () => {
        const randomColor = () => {
            return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        };

        color1Input.value = randomColor();
        color2Input.value = randomColor();
        angleSlider.value = Math.floor(Math.random() * 360);
        angleValue.textContent = angleSlider.value + '°';
        updateGradient();
    };

    const loadPreset = (preset) => {
        const colors = preset.dataset.colors.split(',');
        const angle = preset.dataset.angle || '135';

        color1Input.value = colors[0];
        color2Input.value = colors[1];
        angleSlider.value = angle;
        angleValue.textContent = angle + '°';
        updateGradient();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
