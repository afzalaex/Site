// Function to load the font and generate the pattern
function loadFontAndGeneratePattern() {
    WebFont.load({
        google: {
            families: ['Space Grotesk']
        },
        active: function () {
            generatePattern();
        }
    });
}

// Function to draw the binary pattern on the canvas
function generatePattern() {
    const canvas = document.getElementById('binaryCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 1000;
    canvas.height = 1000;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background color
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '20px Space Grotesk';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const gridSize = 60; // Size of each grid cell
    const padding = 10; // Padding between each cell
    const startX = (canvas.width - 500) / 2;
    const startY = (canvas.height - 500) / 2;

    let binaryString = '';

    for (let row = 0; row < 7; row++) {
        let rowBinary = ''; // Binary for this row/character

        for (let col = 0; col < 7; col++) {
            const x = startX + col * (gridSize + padding) + gridSize / 2;
            const y = startY + row * (gridSize + padding) + gridSize / 2;
            const binaryValue = Math.floor(Math.random() * 2);

            rowBinary += binaryValue;
            ctx.fillStyle = binaryValue === 1 ? '#fff' : '#666';
            ctx.fillText(binaryValue, x, y);
        }

        binaryString += rowBinary; // Append row to binary string
    }

    const artName = convertBinaryToUTF8(binaryString);
    document.getElementById('art-name').innerText = artName;
}

// Function to convert a 49-bit binary string to UTF-8 text (7x7 grid = 7 bytes)
function convertBinaryToUTF8(binary) {
    let text = '';

    for (let i = 0; i < binary.length; i += 7) {
        const byte = binary.slice(i, i + 7).padStart(8, '0');
        const charCode = parseInt(byte, 2);
        text += String.fromCharCode(charCode);
    }

    return text || 'BINARY ART';
}

// Function to download the canvas as an image
function downloadCanvas() {
    const canvas = document.getElementById('binaryCanvas');
    const link = document.createElement('a');
    link.download = 'binary-art.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Load font and generate pattern on page load
window.onload = loadFontAndGeneratePattern;
