// CSS Minifier & Beautifier

(function () {
    'use strict';

    let inputArea, outputArea, errorDiv, successDiv;
    let isMinifyMode = true;

    const init = () => {
        inputArea = document.getElementById('css-input');
        outputArea = document.getElementById('css-output');
        errorDiv = document.getElementById('error-message');
        successDiv = document.getElementById('success-message');

        document.getElementById('btn-minify').addEventListener('click', minifyCSS);
        document.getElementById('btn-beautify').addEventListener('click', beautifyCSS);
        document.getElementById('btn-copy').addEventListener('click', copyOutput);
        document.getElementById('btn-clear').addEventListener('click', clearAll);
    };

    const minifyCSS = () => {
        hideMessages();
        const input = inputArea.value.trim();

        if (!input) {
            showError('Please enter CSS code to minify.');
            return;
        }

        try {
            // Simple minification: remove comments, extra whitespace, and newlines
            let minified = input
                .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
                .replace(/\s+/g, ' ') // Replace multiple spaces with single space
                .replace(/\s*{\s*/g, '{') // Remove spaces around {
                .replace(/\s*}\s*/g, '}') // Remove spaces around }
                .replace(/\s*:\s*/g, ':') // Remove spaces around :
                .replace(/\s*;\s*/g, ';') // Remove spaces around ;
                .replace(/;\s*}/g, '}') // Remove last semicolon before }
                .trim();

            outputArea.textContent = minified;
            showSuccess('CSS minified successfully!');
        } catch (error) {
            showError(`Minification failed: ${error.message}`);
            outputArea.textContent = '';
        }
    };

    const beautifyCSS = () => {
        hideMessages();
        const input = inputArea.value.trim();

        if (!input) {
            showError('Please enter CSS code to beautify.');
            return;
        }

        try {
            // Simple beautification: add newlines and indentation
            let beautified = input
                .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
                .replace(/\s+/g, ' ') // Normalize whitespace
                .replace(/{/g, ' {\n  ') // Add newline after {
                .replace(/}/g, '\n}\n') // Add newlines around }
                .replace(/;/g, ';\n  ') // Add newline after ;
                .replace(/\n\s*\n/g, '\n') // Remove empty lines
                .trim();

            outputArea.textContent = beautified;
            showSuccess('CSS beautified successfully!');
        } catch (error) {
            showError(`Beautification failed: ${error.message}`);
            outputArea.textContent = '';
        }
    };

    const copyOutput = async () => {
        const output = outputArea.textContent;

        if (!output) {
            showError('Nothing to copy. Please process CSS first.');
            return;
        }

        try {
            await navigator.clipboard.writeText(output);
            showSuccess('Copied to clipboard!');
        } catch (error) {
            showError('Failed to copy to clipboard.');
        }
    };

    const clearAll = () => {
        inputArea.value = '';
        outputArea.textContent = '';
        hideMessages();
    };

    const showError = (message) => {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        successDiv.classList.add('hidden');
    };

    const showSuccess = (message) => {
        successDiv.textContent = message;
        successDiv.classList.remove('hidden');
        errorDiv.classList.add('hidden');
    };

    const hideMessages = () => {
        errorDiv.classList.add('hidden');
        successDiv.classList.add('hidden');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
