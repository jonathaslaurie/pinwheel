const canvas = document.getElementById('pinwheel');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const center = { x: width / 2, y: height / 2 };

// Wheel data
const levels = [
  { label: 'Disciplines', values: ['Success', 'Health', 'Mindfulness', 'Mental Health'], radius: 100 },
  { label: 'Approaches', values: ['Inspirational', 'Motivational', 'Practical', 'Theoretical'], radius: 150 },
  { label: 'Audiences', values: ['Beginner', 'Intermediate', 'Expert', 'Professional'], radius: 200 },
];

let angles = [0, 0, 0]; // Initial rotation angles for each layer

// Draw a single layer of the wheel
function drawLayer({ values, radius }, angle) {
  const segmentAngle = (2 * Math.PI) / values.length;
  values.forEach((value, i) => {
    const startAngle = angle + i * segmentAngle;
    const endAngle = startAngle + segmentAngle;

    // Draw segment
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = `hsl(${(i * 360) / values.length}, 70%, 80%)`;
    ctx.fill();
    ctx.stroke();

    // Add text
    const textAngle = startAngle + segmentAngle / 2;
    const textX = center.x + Math.cos(textAngle) * (radius - 40);
    const textY = center.y + Math.sin(textAngle) * (radius - 40);
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(value, textX, textY);
  });
}

// Draw the entire pinwheel
function drawPinwheel() {
  ctx.clearRect(0, 0, width, height);
  levels.forEach((level, i) => drawLayer(level, angles[i]));
}

// Rotate a layer when dragging
let dragging = null;
canvas.addEventListener('mousedown', (e) => {
  const x = e.offsetX - center.x;
  const y = e.offsetY - center.y;
  const distance = Math.sqrt(x ** 2 + y ** 2);

  // Check which layer is being dragged
  dragging = levels.findIndex((level) => distance < level.radius && distance > level.radius - 50);
});

canvas.addEventListener('mousemove', (e) => {
  if (dragging !== null) {
    const x = e.offsetX - center.x;
    const y = e.offsetY - center.y;
    angles[dragging] = Math.atan2(y, x);
    drawPinwheel();
  }
});

canvas.addEventListener('mouseup', () => (dragging = null));

// Initial draw
drawPinwheel();
