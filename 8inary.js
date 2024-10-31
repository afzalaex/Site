// Load font and initialize pattern generation
function loadFontAndGeneratePattern() {
    WebFont.load({
        google: { families: ['Space Grotesk'] },
        active: function () { generatePattern(); }
    });
}

// Generate binary art pattern on the canvas
function generatePattern() {
    const canvas = document.getElementById('binaryCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 1000;

    // Clear the canvas and set background color
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '20px Space Grotesk';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const gridSize = 60;
    const padding = 10;
    const startX = (canvas.width - 500) / 2;
    const startY = (canvas.height - 500) / 2;

    let binaryString = '';

    // Generate the binary pattern in a 7x7 grid
    for (let row = 0; row < 7; row++) {
        let rowBinary = '';  // Binary for the current row (character)
        for (let col = 0; col < 7; col++) {
            const binaryValue = Math.floor(Math.random() * 2);
            rowBinary += binaryValue;
            binaryString += binaryValue;

            ctx.fillStyle = binaryValue === 1 ? '#fff' : '#666';
            ctx.fillText(binaryValue, startX + col * (gridSize + padding), startY + row * (gridSize + padding));
        }
        binaryString += rowBinary;
    }

    // Convert the binary string to a UTF-8 name
    const artName = convertBinaryToUTF8(binaryString);
    document.getElementById('art-name').innerText = artName;
}

// Convert binary string to UTF-8 character string
function convertBinaryToUTF8(binary) {
    let text = '';
    for (let i = 0; i < binary.length; i += 7) {
        const byte = binary.slice(i, i + 7);
        if (byte.length === 7) {
            const charCode = parseInt(byte, 2);
            text += String.fromCharCode(charCode);
        }
    }
    return text || 'BINARY ART';
}

// Download the canvas as an image
function downloadCanvas() {
    const canvas = document.getElementById('binaryCanvas');
    const link = document.createElement('a');
    link.download = 'binary-art.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Event listeners for generate and download buttons
document.getElementById('generate-button').addEventListener('click', generatePattern);
document.getElementById('download-button').addEventListener('click', downloadCanvas);

// Load the font and initialize the pattern on page load
window.onload = loadFontAndGeneratePattern;