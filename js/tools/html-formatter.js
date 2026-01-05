// HTML Formatter
// Client-side HTML formatting using DOM parsing

(function () {
    'use strict';

    let inputArea, outputArea, errorDiv, successDiv;

    const init = () => {
        inputArea = document.getElementById('html-input');
        outputArea = document.getElementById('html-output');
        errorDiv = document.getElementById('error-message');
        successDiv = document.getElementById('success-message');

        document.getElementById('btn-format').addEventListener('click', formatHTML);
        document.getElementById('btn-copy').addEventListener('click', copyOutput);
        document.getElementById('btn-clear').addEventListener('click', clearAll);
    };

    const formatHTML = () => {
        hideMessages();
        const input = inputArea.value.trim();

        if (!input) {
            showError('Please enter HTML code to format.');
            return;
        }

        try {
            // Use a simple indentation approach
            const formatted = indentHTML(input);
            outputArea.textContent = formatted;
            showSuccess('HTML formatted successfully!');
        } catch (error) {
            showError(`Formatting failed: ${error.message}`);
        }
    };

    const indentHTML = (html) => {
        let indent = 0;
        const tab = '  '; // 2 spaces
        return html
            .replace(/>\s*</g, '>\n<') // Add newlines between tags
            .split('\n')
            .map(line => {
                line = line.trim();
                if (line.match(/^<\//)) {
                    indent = Math.max(0, indent - 1); // Closing tag, decrease indent
                }
                const result = tab.repeat(indent) + line;
                if (line.match(/^<[^/]/) && !line.match(/\/>$/) && !line.match(/^<(br|hr|img|input|meta|link)/)) {
                    indent++; // Opening tag, increase indent
                }
                return result;
            })
            .join('\n');
    };

    const copyOutput = async () => {
        const output = outputArea.textContent;
        if (!output) {
            showError('Nothing to copy.');
            return;
        }
        try {
            await navigator.clipboard.writeText(output);
            showSuccess('Copied to clipboard!');
        } catch (e) {
            showError('Failed to copy.');
        }
    };

    const clearAll = () => {
        inputArea.value = '';
        outputArea.textContent = '';
        hideMessages();
    };

    const showError = (msg) => {
        errorDiv.textContent = msg;
        errorDiv.classList.remove('hidden');
        successDiv.classList.add('hidden');
    };

    const showSuccess = (msg) => {
        successDiv.textContent = msg;
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
