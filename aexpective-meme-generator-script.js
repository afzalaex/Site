function generateImage(text, color, fontSize, layout) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  context.font = fontSize + 'px Arial';
  context.fillStyle = color;

  const x = layout === 'center' ? canvas.width / 2 : layout === 'right' ? canvas.width - context.measureText(text).width : 0;
  const y = canvas.height / 2;

  context.fillText(text, x, y);

  const canvasContainer = document.getElementById('canvas-container');
  canvasContainer.innerHTML = '';
  canvasContainer.appendChild(canvas);
}

textInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    generateButton.click();
  }
});

colorPicker.on('color:change', function() {
  generateButton.click();
});

fontSizeInput.addEventListener('change', function() {
  generateButton.click();
});

layoutSelect.addEventListener('change', function() {
  generateButton.click();
});
