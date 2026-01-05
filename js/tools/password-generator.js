// Password Generator
// Generate secure random passwords

(function () {
    'use strict';

    let passwordOutput, lengthSlider, lengthValue;
    let uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck;
    let strengthIndicator, copyBtn;

    const init = () => {
        passwordOutput = document.getElementById('password-output');
        lengthSlider = document.getElementById('length-slider');
        lengthValue = document.getElementById('length-value');
        uppercaseCheck = document.getElementById('uppercase');
        lowercaseCheck = document.getElementById('lowercase');
        numbersCheck = document.getElementById('numbers');
        symbolsCheck = document.getElementById('symbols');
        strengthIndicator = document.getElementById('strength-indicator');
        copyBtn = document.getElementById('btn-copy');

        lengthSlider.addEventListener('input', updateLength);
        document.getElementById('btn-generate').addEventListener('click', generatePassword);
        copyBtn.addEventListener('click', copyPassword);

        // Generate initial password
        generatePassword();
    };

    const updateLength = () => {
        lengthValue.textContent = lengthSlider.value;
    };

    const generatePassword = () => {
        const length = parseInt(lengthSlider.value);
        const useUppercase = uppercaseCheck.checked;
        const useLowercase = lowercaseCheck.checked;
        const useNumbers = numbersCheck.checked;
        const useSymbols = symbolsCheck.checked;

        if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
            alert('Please select at least one character type!');
            return;
        }

        let charset = '';
        if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (useNumbers) charset += '0123456789';
        if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let password = '';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            password += charset[array[i] % charset.length];
        }

        passwordOutput.value = password;
        updateStrength(password, useUppercase, useLowercase, useNumbers, useSymbols);
    };

    const updateStrength = (password, hasUpper, hasLower, hasNum, hasSymbol) => {
        let strength = 0;
        const length = password.length;

        if (length >= 8) strength++;
        if (length >= 12) strength++;
        if (length >= 16) strength++;
        if (hasUpper) strength++;
        if (hasLower) strength++;
        if (hasNum) strength++;
        if (hasSymbol) strength++;

        let text = '';
        let color = '';

        if (strength <= 3) {
            text = 'Weak';
            color = 'var(--error)';
        } else if (strength <= 5) {
            text = 'Medium';
            color = 'var(--warning)';
        } else {
            text = 'Strong';
            color = 'var(--success)';
        }

        strengthIndicator.textContent = `Strength: ${text}`;
        strengthIndicator.style.color = color;
    };

    const copyPassword = async () => {
        const password = passwordOutput.value;

        try {
            await navigator.clipboard.writeText(password);
            copyBtn.textContent = '✓ Copied!';
            setTimeout(() => {
                copyBtn.textContent = '📋 Copy';
            }, 2000);
        } catch (error) {
            alert('Failed to copy password');
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
