// Base64 Encoder/Decoder

(function () {
    'use strict';

    let inputArea, outputArea, errorDiv, successDiv, modeToggle;
    let isEncodeMode = true;

    const init = () => {
        inputArea = document.getElementById('base64-input');
        outputArea = document.getElementById('base64-output');
        errorDiv = document.getElementById('error-message');
        successDiv = document.getElementById('success-message');
        modeToggle = document.getElementById('mode-toggle');

        document.getElementById('btn-convert').addEventListener('click', convert);
        document.getElementById('btn-copy').addEventListener('click', copyOutput);
        document.getElementById('btn-clear').addEventListener('click', clearAll);
        modeToggle.addEventListener('click', toggleMode);
    };

    const toggleMode = () => {
        isEncodeMode = !isEncodeMode;
        modeToggle.textContent = isEncodeMode ? '🔄 Switch to Decode' : '🔄 Switch to Encode';
        document.getElementById('mode-label').textContent = isEncodeMode ? 'Encode Mode' : 'Decode Mode';
        document.getElementById('input-label').textContent = isEncodeMode ? 'Text to Encode:' : 'Base64 to Decode:';
        clearAll();
    };

    const convert = () => {
        hideMessages();
        const input = inputArea.value.trim();

        if (!input) {
            showError('Please enter text to convert.');
            return;
        }

        try {
            if (isEncodeMode) {
                const encoded = btoa(unescape(encodeURIComponent(input)));
                outputArea.textContent = encoded;
                showSuccess('Text encoded successfully!');
            } else {
                const decoded = decodeURIComponent(escape(atob(input)));
                outputArea.textContent = decoded;
                showSuccess('Base64 decoded successfully!');
            }
        } catch (error) {
            showError(`Conversion failed: ${error.message}`);
            outputArea.textContent = '';
        }
    };

    const copyOutput = async () => {
        const output = outputArea.textContent;

        if (!output) {
            showError('Nothing to copy. Please convert text first.');
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
