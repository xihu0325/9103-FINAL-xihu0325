let sideLength; // The diameter of the biggest circle
let gap = 0; // The gap between the circle
let rows = 5; // Line number
let cols = 7; // Number of columns
let rotationSpeed = 0.01; // The spin speed
let smallEllipseDiameter = 10; // The diameter of a small ellipse
let smallEllipseCount = 10; // The number of small ovals per large circle
let smallEllipseDistance = 3; // The distance between the small ellipse and the big circle
let concentricCircles = 4; // The number of concentric circles
let concentricCircleColors = []; // The color of concentric circles
let dottedCircles = 4; // The number of concentric dotted rings per layer
let enCircle = null; // Store the large circle that is clicked and enlarged


// Generate random color values
function genRandomColors() {
  //Generates random concentric color values
  for (let i = 0; i < rows; i++) {
    concentricCircleColors.push([]); // Initializes a two-dimensional array
    for (let j = 0; j < cols; j++) {
      concentricCircleColors[i].push([]);
      for (let k = 0; k < concentricCircles; k++) {
        concentricCircleColors[i][j].push(color(random(10), random(400), random(400)));
      }
    }
  }
}

// Get contrasting colors
function getContrastColor(hexColor) {
  let c = color(hexColor);
  let r = red(c);
  let g = green(c);
  let b = blue(c);
  let contrastR = 0 - r;
  let contrastG = 225 - g;
  let contrastB = 225 - b;
  return color(contrastR, contrastG, contrastB, 160);
}

function drawEllipses(i, j, k, radius) {
  push();
  rotate(frameCount / (50.0 / (j + 50))); // Change the rotation speed according to the circle
  noFill();
  stroke(getContrastColor(concentricCircleColors[i][j][k])); // Set the stroke color
  strokeWeight(2);
  for (let angle = 0; angle < 360; angle += 10) {
    let ellipseX = radius * 0.8 + 10 * sin(10 * angle + noise(angle * 5) * 10); // Use the degree to calculate the sin function and add Berlin noise
    let ellipseY = radius * 0.8 + 10 * cos(10 * angle + noise(angle * 5) * 10);
    let x = ellipseX * cos(angle);
    let y = ellipseY * sin(angle);
    ellipse(x, y, smallEllipseDiameter, smallEllipseDiameter);
  }
  pop();
}

// Modifies the function that draws wave-shaped circles
function drawWaveCircle(i, j, k, radius) {
  push();
  rotate(frameCount / (50.0 / (j + 50))); //Change the rotation speed according to the circle
  beginShape();
  noFill();
  stroke(getContrastColor(concentricCircleColors[i][j][k])); // Set the stroke color
  strokeWeight(5);
  for (let angle = 0; angle < 360; angle += 0.5) {
    let r = radius * 0.8 + 15 * sin(15 * angle + noise(angle * 5) * 10); // Use the degree to calculate the sin function and add Berlin noise
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  beginShape();
  strokeWeight(1);
  for (let angle = 0; angle < 360; angle += 0.5) {
    let r = radius * 0.8 + 10 * sin(20 * angle + noise(angle * 2) * 20); // Use the degree to calculate the sin function and add Berlin noise
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

//Modify the function that draws the dotted ring
function drawDottedCircle(i, j, k, radius) {
  for (let n = 0; n < dottedCircles && k < concentricCircles - 1; n++) {
    push();
    rotate(frameCount / (50.0 / (k + 50))); // Change the rotation speed according to the circle
    stroke(getContrastColor(concentricCircleColors[i][j][k]));
    strokeWeight(6 - k); //Set stroke width
    noFill();
    drawingContext.setLineDash([70, 10 + k]);

    let circleRadius = radius * 2 - 10 - 20 * n + noise(n * 40) * 10; // Draw concentric circles, change the radius according to the index of the circle, and add Berlin noise
    ellipse(0, 0, circleRadius);
    pop();
    drawingContext.setLineDash([]);
    drawEllipses(i, j, k, radius);
  }
}

// Draw small ovals and lines
function drawSmallEllipses() {
  let smallEllipses = [];
  for (let k = 0; k < smallEllipseCount; k++) {
    let angle = map(k, TWO_PI, smallEllipseCount, 0, TWO_PI);
    let x = (sideLength / 5 + smallEllipseDistance) * cos(angle + smallEllipseDistance * 5);
    let y = (sideLength / 3 + smallEllipseDistance) * sin(angle + smallEllipseDistance * 3);
    smallEllipses.push({ x, y });
  }

  stroke(255, 255, 250, 220);
  strokeWeight(12);
  noFill();
  beginShape();
  for (let i = 0; i < smallEllipseCount; i++) {
    let x1 = smallEllipses[i].x;
    let y1 = smallEllipses[i].y;

    x1 = smallEllipses[i].x * cos(frameCount * 0) - smallEllipses[i].y * sin(frameCount * 0.21);
    y1 = smallEllipses[i].x * sin(frameCount * 0) + smallEllipses[i].y * cos(frameCount * 0.11);

    curveVertex(x1, y1);
  }
  curveVertex(smallEllipses[1].x, smallEllipses[1].y);
  endShape();
}


//Draw a gradient half-arc connecting the centers of two large circles
function drawGradientArc2() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      push();
      translate((j + 10 * (i % 2)) * (sideLength + gap * 10), i * (sideLength + gap) + sideLength / 3); // Move the origin to the center of each great circle
      if (!(i % 2 === 0 && j % 2 !== 0) && !(i % 2 !== 0 && j % 2 === 0)) {
        let arcStartAngle = 0; // The Angle at which the arc begins
        let arcEndAngle = 180; // The end Angle of the arc, although not very useful
        for (let i = arcStartAngle; i <= arcEndAngle; i++) {
          let t = map(i, arcStartAngle, arcEndAngle, 0, 1); // 将角度映射到0和1之间
          let gradientColor = lerpColor(color(230, 255, 240), color(230, 255, 240), t); // Get color
          stroke(gradientColor);
          strokeWeight(13);
          noFill();
          arc(sideLength - gap * 1, 10, sideLength + gap * 35, sideLength * 0.5, i, i + 1); // Draw an arc for a small segment
        }
      }
      pop();
    }
  }
}

// A function that draws a great circle
function drawConcentricCircles() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      push();
      translate((j - 0.6 * (i % 2)) * (sideLength + gap * 5), i * (sideLength + gap) + windowHeight / 10); // Move the origin to the center of each great circle
      rotate(frameCount * rotationSpeed);
      for (let k = 0; k < concentricCircles; k++) {
        let radius = sideLength / 2 - k * (sideLength / (1.8 * concentricCircles));
        fill(concentricCircleColors[i][j][k]); // Set the fill color to random
        noStroke();
        ellipse(0, 0, radius * 2, radius * 2); // Draw concentric circles

        // Determine if it is clicked and zoomed in
        if (enCircle !== null && enCircle.i === i && enCircle.j === j && enCircle.k === k) {
          let scaleFactor = 2; // enlargement
          scale(scaleFactor);
        }

        if (i % 2 === 0 && j % 2 !== 0) {
          drawWaveCircle(i, j, k, radius);
        } else {
          drawDottedCircle(i, j, k, radius);
        }

        if (k < concentricCircles + 1) {
          // Draw curves between concentric circles
          stroke(240, 255, 50, 230);
          strokeWeight(10);
          noFill();
          beginShape();
          for (let angle = 0; angle < TWO_PI; angle += radians(2)) { // Use radians
            let x = radius * 0.8 + 4 * sin(10 * angle); // Use the degree to calculate the sin function and add Berlin noise
            let y = radius * 0.8 + 4 * cos(10 * angle);
            vertex(x, y);
          }
          endShape(CLOSE);
        }
      }

      drawSmallEllipses();
      pop();
    }
  }
  drawGradientArc2();
}
function mousePressed() {
  // Check that the mouse is in a large circle
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < concentricCircles; k++) {
        let x = (j - 0.6 * (i % 2)) * (sideLength + gap * 11);
        let y = i * (sideLength + gap) + windowHeight / 11;
        let radius = sideLength / 2 - k * (sideLength / (1.8 * concentricCircles));

        if (dist(mouseX, mouseY, x, y) < radius) {
          // The mouse clicks on the big circle and stores the information about the big circle being clicked
          enCircle = { i, j, k };
        }
      }
    }
  }
}

function mouseReleased() {

  enCircle = null;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sideLength = windowHeight / 4; // Set the diameter of the large circle to one quarter of the height of the window
  angleMode(RADIANS);
  genRandomColors();
}

function draw() {
  // Draw a magnetic field flow diagram
  background(60);

  let yoff = 0;
  for (let y = 0; y < height; y += 10) {
    let xoff = 0;
    beginShape();
    for (let x = 0; x < width; x += 10) {
      let angle = noise(xoff, yoff) * TWO_PI * 1;
      let v = p5.Vector.fromAngle(angle);
      xoff += 0.5;
      stroke(255);
      strokeWeight(4);
      noFill();
      line(x, y, x + v.x * 5, y + v.y * 5);
    }
    endShape();
    yoff += 0.5;
  }
  drawConcentricCircles(); // Draw the modified concentric circles
  let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 95;

  stroke(250, 250, 250, 230)
  strokeWeight(10)

  ellipse(mouseX, mouseY, 30, 30, 100)
  // Plot trajectory, 
  line(mouseX, mouseY, pmouseX, pmouseY);

}


