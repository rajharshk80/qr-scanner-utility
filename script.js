let lastResult, countResults = 0;
let scannedUrl = null;

function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
        ++countResults;
        lastResult = decodedText;
        
        // UI Updates
        const resultElement = document.getElementById('result');
        const resultBox = document.getElementById('result-box');
        const openLinkBtn = document.getElementById('openLinkBtn');

        resultElement.innerText = decodedText;
        resultElement.classList.remove('placeholder');
        resultBox.classList.add('scanned');

        // Vibrate phone briefly (haptic feedback) - Requires mobile interaction permission
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }

        // Check if it's a URL and show action button
        if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
            scannedUrl = decodedText;
            openLinkBtn.style.display = 'inline-block';
            openLinkBtn.innerHTML = `<i class="fas fa-external-link-alt"></i> Open ${getDomain(decodedText)}`;
        } else {
            scannedUrl = null;
            openLinkBtn.style.display = 'none';
        }

        // Optional: Stop scanner after one successful scan (comment out if you want continuous scanning)
        // html5QrcodeScanner.clear().catch(error => console.error("Failed to clear scanner.", error));
    }
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning
    // console.warn(`Code scan error = ${error}`);
}

// Initialize Scanner
let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", 
    { 
        fps: 10,            # Frame per second - smoother scan
        qrbox: { width: 220, height: 220 }, # Scanning area hint
        aspectRatio: 1.0,   # Ensures camera feed is square
        showTorchButtonIfAvailable: true # Adds flash/light button if camera supports
    },
    /* verbose= */ false
);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);

// Helper function to extract domain name for button text
function getDomain(url) {
    try {
        return new URL(url).hostname.replace('www.', '');
    } catch (e) {
        return 'Link';
    }
}

// Function to open the scanned URL
function openScannedLink() {
    if (scannedUrl) {
        window.open(scannedUrl, '_blank');
    }
}