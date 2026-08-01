function onScanSuccess(decodedText, decodedResult) {
  
    console.log(`Code matched = ${decodedText}`, decodedResult);
    document.getElementById('result').innerText = `Scanned Result: ${decodedText}`;
    
    // Optional: Agar aap chahte hain ki scan hote hi URL khul jaye (agar QR me link hai)
    // if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
    //     window.open(decodedText, '_blank');
    // }
}

function onScanFailure(error) {
    // Error handling (yeh har frame me call hota hai jab tak QR na mile, isliye ise ignore kar sakte hain)
    // console.warn(`Code scan error = ${error}`);
}

// Scanner initialize karein
let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", 
    { fps: 10, qrbox: { width: 250, height: 250 } },
    /* verbose= */ false
);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);