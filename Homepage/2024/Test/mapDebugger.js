const mapDebugger = () => {
  // Create canvas
  const canvasElement = document.createElement("canvas");
  canvasElement.id = "mapDebuggerCanvas";
  canvasElement.width = 1920;
  canvasElement.height = 554;

  // Set canvas style
  const canvasStyle = canvasElement.style;
  canvasStyle.position = "absolute";
  canvasStyle.top = "0";
  canvasStyle.left = "0";

  // Attach canvas to Hero Banner
  const containerElement = document.querySelector(".heroBanner");
  containerElement.appendChild(canvasElement);

  // Create canvas context
  const ctx = canvasElement.getContext("2d");

  // Canvas visualizer
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  // Create rect
  ctx.beginPath();
  ctx.rect(20, 20, 150, 100);
  ctx.stroke();
};


