const textInput = document.getElementById('text-input');
const colorSelect = document.getElementById('color-select');
const layoutSelect = document.getElementById('layout-select');
const generateButton = document.getElementById('generate-button');

generateButton.addEventListener('click', function() {
  const text = textInput.value;
  const color = colorSelect.value;
  const layout = layoutSelect.value;
  generateImage(text, color, layout);
});

function generateImage(text, color, layout) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  context.font = '36px Arial';
  context.fillStyle = color;

  const x = layout === 'center' ? canvas.width / 2 : layout === 'right' ? canvas.width - 20 : 20;
  const y = canvas.height / 2;

  context.textAlign = layout;
  context.textBaseline = 'middle';
  context.fillText(text, x, y);

  const canvasContainer = document.getElementById('canvas-container');
  canvasContainer.appendChild(canvas);

  const downloadLink = document.createElement('a');
  downloadLink.href = canvas.toDataURL();
  downloadLink.download = 'text-image.png';
  downloadLink.innerText = 'Download Image';
  canvasContainer.appendChild(downloadLink);
}