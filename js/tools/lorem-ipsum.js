// Lorem Ipsum Generator

(function () {
    'use strict';

    let outputArea, paragraphsInput, wordsInput, typeSelect;

    const loremWords = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
        'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
        'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
        'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
        'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ];

    const init = () => {
        outputArea = document.getElementById('lorem-output');
        paragraphsInput = document.getElementById('paragraphs');
        wordsInput = document.getElementById('words');
        typeSelect = document.getElementById('type');

        document.getElementById('btn-generate').addEventListener('click', generateLorem);
        document.getElementById('btn-copy').addEventListener('click', copyOutput);
        document.getElementById('btn-clear').addEventListener('click', clearAll);

        typeSelect.addEventListener('change', updateInputs);
        updateInputs();
    };

    const updateInputs = () => {
        const type = typeSelect.value;
        // Use parentElement to be safe if closest is flaky (though it shouldn't be)
        const paragraphsGroup = paragraphsInput.parentElement;
        const wordsGroup = wordsInput.parentElement;

        console.log('Update Inputs:', type); // Debug

        if (type === 'paragraphs') {
            paragraphsGroup.style.display = 'block';
            wordsGroup.style.display = 'none';
        } else {
            paragraphsGroup.style.display = 'none';
            wordsGroup.style.display = 'block';
        }
    };

    const generateLorem = () => {
        const type = typeSelect.value;
        let result = '';

        if (type === 'paragraphs') {
            let count = parseInt(paragraphsInput.value) || 3;
            if (count > 50) count = 50; // Hard limit
            if (count < 1) count = 1;
            paragraphsInput.value = count;
            result = generateParagraphs(count);
        } else {
            let count = parseInt(wordsInput.value) || 50;
            if (count > 2000) count = 2000; // Hard limit to prevent crash
            if (count < 1) count = 1;
            wordsInput.value = count;
            result = generateWords(count);
        }

        outputArea.textContent = result;
    };

    const generateParagraphs = (count) => {
        const paragraphs = [];
        for (let i = 0; i < count; i++) {
            const sentenceCount = Math.floor(Math.random() * 3) + 3; // 3-5 sentences
            const sentences = [];

            for (let j = 0; j < sentenceCount; j++) {
                const wordCount = Math.floor(Math.random() * 10) + 5; // 5-14 words
                const words = generateWords(wordCount).split(' ');
                words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
                sentences.push(words.join(' ') + '.');
            }

            paragraphs.push(sentences.join(' '));
        }

        return paragraphs.join('\n\n');
    };

    const generateWords = (count) => {
        const words = [];
        // Double check limit here just in case called internally with large number
        if (count > 5000) count = 5000;

        for (let i = 0; i < count; i++) {
            words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        return words.join(' ');
    };

    const copyOutput = async () => {
        const output = outputArea.textContent;

        if (!output) {
            alert('Nothing to copy. Please generate text first.');
            return;
        }

        try {
            await navigator.clipboard.writeText(output);
            const btn = document.getElementById('btn-copy');
            btn.textContent = '✓ Copied!';
            setTimeout(() => {
                btn.textContent = '📋 Copy';
            }, 2000);
        } catch (error) {
            alert('Failed to copy to clipboard');
        }
    };

    const clearAll = () => {
        outputArea.textContent = '';
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
