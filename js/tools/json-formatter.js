// JSON Formatter & Validator
// Client-side JSON formatting, validation, and minification

(function () {
    'use strict';

    let inputArea, outputArea, errorDiv, successDiv;

    // Initialize on DOM load
    const init = () => {
        inputArea = document.getElementById('json-input');
        outputArea = document.getElementById('json-output');
        errorDiv = document.getElementById('error-message');
        successDiv = document.getElementById('success-message');

        // Add event listeners
        document.getElementById('btn-format').addEventListener('click', formatJSON);
        document.getElementById('btn-minify').addEventListener('click', minifyJSON);
        document.getElementById('btn-validate').addEventListener('click', validateJSON);
        document.getElementById('btn-copy').addEventListener('click', copyOutput);
        document.getElementById('btn-clear').addEventListener('click', clearAll);
        document.getElementById('btn-example').addEventListener('click', loadExample);
    };

    // Format JSON
    const formatJSON = () => {
        hideMessages();
        const input = inputArea.value.trim();

        if (!input) {
            showError('Please enter JSON data to format.');
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            outputArea.textContent = formatted;
            showSuccess('JSON formatted successfully!');
        } catch (error) {
            showError(`Invalid JSON: ${error.message}`);
            outputArea.textContent = '';
        }
    };

    // Minify JSON
    const minifyJSON = () => {
        hideMessages();
        const input = inputArea.value.trim();

        if (!input) {
            showError('Please enter JSON data to minify.');
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            outputArea.textContent = minified;
            showSuccess('JSON minified successfully!');
        } catch (error) {
            showError(`Invalid JSON: ${error.message}`);
            outputArea.textContent = '';
        }
    };

    // Validate JSON
    const validateJSON = () => {
        hideMessages();
        const input = inputArea.value.trim();

        if (!input) {
            showError('Please enter JSON data to validate.');
            return;
        }

        try {
            JSON.parse(input);
            showSuccess('✓ Valid JSON!');
            outputArea.textContent = 'Your JSON is valid and properly formatted.';
        } catch (error) {
            showError(`✗ Invalid JSON: ${error.message}`);
            outputArea.textContent = '';
        }
    };

    // Copy output to clipboard
    const copyOutput = async () => {
        const output = outputArea.textContent;

        if (!output) {
            showError('Nothing to copy. Please format or minify JSON first.');
            return;
        }

        try {
            await navigator.clipboard.writeText(output);
            showSuccess('Copied to clipboard!');
        } catch (error) {
            showError('Failed to copy to clipboard.');
        }
    };

    // Clear all
    const clearAll = () => {
        inputArea.value = '';
        outputArea.textContent = '';
        hideMessages();
    };

    // Load example JSON
    const loadExample = () => {
        const example = {
            "name": "DevToolBox",
            "version": "1.0.0",
            "description": "Free online tools for developers",
            "tools": [
                "JSON Formatter",
                "HTML Beautifier",
                "CSS Minifier"
            ],
            "features": {
                "free": true,
                "noSignup": true,
                "clientSide": true
            }
        };

        inputArea.value = JSON.stringify(example);
        hideMessages();
    };

    // Show error message
    const showError = (message) => {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        successDiv.classList.add('hidden');
    };

    // Show success message
    const showSuccess = (message) => {
        successDiv.textContent = message;
        successDiv.classList.remove('hidden');
        errorDiv.classList.add('hidden');
    };

    // Hide all messages
    const hideMessages = () => {
        errorDiv.classList.add('hidden');
        successDiv.classList.add('hidden');
    };

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
