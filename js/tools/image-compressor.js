document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('upload-input');
    const compressionArea = document.getElementById('compression-area');
    const qualityInput = document.getElementById('quality');
    const qualityVal = document.getElementById('quality-val');
    const formatSelect = document.getElementById('format-select');
    const originalPreview = document.getElementById('original-preview');
    const compressedPreview = document.getElementById('compressed-preview');
    const originalInfo = document.getElementById('original-info');
    const compressedInfo = document.getElementById('compressed-info');
    const savingsInfo = document.getElementById('savings-info');
    const downloadBtn = document.getElementById('download-btn');

    let originalFile = null;

    // Handle File Upload
    uploadInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            originalFile = e.target.files[0];
            processFile(originalFile);
        }
    });

    function processFile(file) {
        // Show interface
        compressionArea.classList.remove('hidden');

        // Display Original Info
        originalInfo.textContent = formatBytes(file.size);

        // Smart Format Selection
        // If it's a PNG, default to JPEG for size savings, unless user wants PNG
        // But for "smart" behavior, let's stick to a safe default or keep previous selection
        // Let's rely on the dropdown's current value (default JPEG)

        // Load Original Image
        const reader = new FileReader();
        reader.onload = (e) => {
            originalPreview.src = e.target.result;
            // Compress after loading
            compressImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    // Handle Quality Change
    qualityInput.addEventListener('input', (e) => {
        const quality = e.target.value;
        qualityVal.textContent = `${quality}%`;
        if (originalPreview.src) {
            compressImage(originalPreview.src);
        }
    });

    // Handle Format Change
    formatSelect.addEventListener('change', () => {
        if (originalPreview.src) {
            compressImage(originalPreview.src);
        }
    });

    function compressImage(base64Str) {
        const quality = qualityInput.value / 100;
        const format = formatSelect.value;

        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            // Fill white background for JPEGs (handling transparent PNGs converted to JPG)
            if (format === 'image/jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.drawImage(img, 0, 0);

            // Compress
            const compressedDataUrl = canvas.toDataURL(format, quality);

            // Update Preview
            compressedPreview.src = compressedDataUrl;

            // Calculate Size
            const head = 'data:' + format + ';base64,';
            const size = Math.round((compressedDataUrl.length - head.length) * 3 / 4);
            compressedInfo.textContent = formatBytes(size);

            // Calculate Savings
            const savings = ((originalFile.size - size) / originalFile.size * 100).toFixed(1);
            if (savings > 0) {
                savingsInfo.textContent = `Saved ${savings}%`;
                savingsInfo.style.color = 'var(--success)';
            } else {
                savingsInfo.textContent = `No savings (try lower quality)`;
                savingsInfo.style.color = 'var(--warning)';
            }

            // Get extension
            let ext = 'jpg';
            if (format === 'image/png') ext = 'png';
            if (format === 'image/webp') ext = 'webp';

            // Update Download Link
            downloadBtn.href = compressedDataUrl;
            const originalName = originalFile.name.substring(0, originalFile.name.lastIndexOf('.')) || originalFile.name;
            downloadBtn.download = `${originalName}_compressed.${ext}`;
        };
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
});
