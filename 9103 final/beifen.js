let sideLength; // 大圆的直径
let gap = 0; // 大圆之间的间隔
let rows = 5; // 行数
let cols = 7; // 列数
let rotationSpeed = 0.01; // 自旋速度
let smallEllipseDiameter = 10; // 小椭圆的直径
let smallEllipseCount = 10; // 每个大圆的小椭圆数量
let smallEllipseDistance = 3; // 小椭圆距离大圆的距离
let concentricCircles = 4; // 同心圆的数量
let concentricCircleColors = []; // 同心圆的颜色
let dottedCircles = 4; // 每层同心圆虚线环的数量
let enCircle = null; // 用于存储被点击并放大的大圆

// 初始化噪声的 y 维度

// 生成随机色值，三维数组
function genRandomColors() {
  // 生成随机的同心圆颜色值
  for (let i = 0; i < rows; i++) {
    concentricCircleColors.push([]); // 初始化二维数组
    for (let j = 0; j < cols; j++) {
      concentricCircleColors[i].push([]);
      for (let k = 0; k < concentricCircles; k++) {
        concentricCircleColors[i][j].push(color(random(10), random(400), random(400)));
      }
    }
  }
}

// 获取对比色
function getContrastColor(hexColor) {
  let c = color(hexColor); // 创建颜色
  let r = red(c); // 获取红色分量
  let g = green(c); // 获取绿色分量
  let b = blue(c); // 获取蓝色分量
  let contrastR = 0 - r;
  let contrastG = 225 - g;
  let contrastB = 225 - b;
  return color(contrastR, contrastG, contrastB, 160);
}

function drawEllipses(i, j, k, radius) {
  push();
  rotate(frameCount / (50.0 / (j + 50))); // 根据圆的索引改变旋转速度
  noFill();
  stroke(getContrastColor(concentricCircleColors[i][j][k])); // 设置描边颜色
  strokeWeight(2);
  for (let angle = 0; angle < 360; angle += 10) {
    let ellipseX = radius * 0.8 + 10 * sin(10 * angle + noise(angle * 5) * 10); // 使用度来计算sin函数，并加入柏林噪声
    let ellipseY = radius * 0.8 + 10 * cos(10 * angle + noise(angle * 5) * 10);
    let x = ellipseX * cos(angle);
    let y = ellipseY * sin(angle);
    ellipse(x, y, smallEllipseDiameter, smallEllipseDiameter);
  }
  pop();
}

// 修改绘制波浪形状的圆的函数
function drawWaveCircle(i, j, k, radius) {
  push();
  rotate(frameCount / (50.0 / (j + 50))); // 根据圆的索引改变旋转速度
  // 绘制波浪形状的圆
  beginShape();
  noFill();
  stroke(getContrastColor(concentricCircleColors[i][j][k])); // 设置描边颜色
  strokeWeight(5); // 设置描边宽度
  for (let angle = 0; angle < 360; angle += 0.5) {
    let r = radius * 0.8 + 15 * sin(15 * angle + noise(angle * 5) * 10); // 使用度来计算sin函数，并加入柏林噪声
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  beginShape();
  strokeWeight(1); // 设置描边宽度
  for (let angle = 0; angle < 360; angle += 0.5) {
    let r = radius * 0.8 + 10 * sin(20 * angle + noise(angle * 2) * 20); // 使用度来计算sin函数，并加入柏林噪声
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

// 修改绘制虚线环的函数
function drawDottedCircle(i, j, k, radius) {
  for (let n = 0; n < dottedCircles && k < concentricCircles - 1; n++) {
    push();
    rotate(frameCount / (50.0 / (k + 50))); // 根据圆的索引改变旋转速度
    stroke(getContrastColor(concentricCircleColors[i][j][k])); // 设置描边颜色
    strokeWeight(6 - k); // 设置描边宽度
    noFill(); // 不填充
    drawingContext.setLineDash([70, 10 + k]);

    // 绘制同心圆，根据圆的索引改变半径，并加入柏林噪声
    let circleRadius = radius * 2 - 10 - 20 * n + noise(n * 40) * 10;
    ellipse(0, 0, circleRadius);
    pop();
    drawingContext.setLineDash([]); // 重置虚线样式
    drawEllipses(i, j, k, radius);
  }
}

// 绘制小椭圆和连线
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
  // 结尾要回到起点，以形成闭合曲线
  curveVertex(smallEllipses[1].x, smallEllipses[1].y);
  endShape();
}


//绘制连接两个大圆圆心的渐变半弧线
function drawGradientArc2() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      push();
      translate((j + 10 * (i % 2)) * (sideLength + gap * 10), i * (sideLength + gap) + sideLength / 3); // 将原点移动到每个大圆的中心
      if (!(i % 2 === 0 && j % 2 !== 0) && !(i % 2 !== 0 && j % 2 === 0)) {
        let arcStartAngle = 0; // 弧线的开始角度
        let arcEndAngle = 180; // 弧线的结束角度
        for (let i = arcStartAngle; i <= arcEndAngle; i++) {
          let t = map(i, arcStartAngle, arcEndAngle, 0, 1); // 将角度映射到0和1之间
          let gradientColor = lerpColor(color(230, 255, 240), color(230, 255, 240), t); // 获取插值颜色
          stroke(gradientColor); // 设置描边颜色为插值颜色
          strokeWeight(13); // 设置描边宽度
          noFill(); // 不填充
          arc(sideLength - gap * 1, 10, sideLength + gap * 35, sideLength * 0.5, i, i + 1); // 绘制一个小段的弧线
        }
      }
      pop();
    }
  }
}

// 修改绘制大圆的函数
function drawConcentricCircles() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      push();
      translate((j - 0.6 * (i % 2)) * (sideLength + gap * 5), i * (sideLength + gap) + windowHeight / 10); // 将原点移动到每个大圆的中心
      rotate(frameCount * rotationSpeed); // 使每个大圆自旋
      // 绘制同心圆
      for (let k = 0; k < concentricCircles; k++) {
        let radius = sideLength / 2 - k * (sideLength / (1.8 * concentricCircles));
        fill(concentricCircleColors[i][j][k]); // 设置填充颜色为随机色
        noStroke(); // 不描边
        ellipse(0, 0, radius * 2, radius * 2); // 绘制同心圆

        // 判断是否被点击并放大
        if (enCircle !== null && enCircle.i === i && enCircle.j === j && enCircle.k === k) {
          let scaleFactor = 2; // 放大因子
          scale(scaleFactor);
        }

        if (i % 2 === 0 && j % 2 !== 0) {
          drawWaveCircle(i, j, k, radius);
        } else {
          drawDottedCircle(i, j, k, radius);
        }

        if (k < concentricCircles + 1) {
          // 绘制同心圆之间的曲线
          stroke(240, 255, 50, 230);
          strokeWeight(10);
          noFill();
          beginShape();
          for (let angle = 0; angle < TWO_PI; angle += radians(2)) { // 使用弧度制
            let x = radius * 0.8 + 4 * sin(10 * angle); // 使用度来计算sin函数，并加入柏林噪声
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
  // 检查鼠标是否位于某个大圆内
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < concentricCircles; k++) {
        let x = (j - 0.6 * (i % 2)) * (sideLength + gap * 11);
        let y = i * (sideLength + gap) + windowHeight / 11;
        let radius = sideLength / 2 - k * (sideLength / (1.8 * concentricCircles));

        if (dist(mouseX, mouseY, x, y) < radius) {
          // 鼠标点击了该大圆，存储被点击的大圆信息
          enCircle = { i, j, k };
        }
      }
    }
  }
}

function mouseReleased() {
  // 清除被点击的大圆信息
  enCircle = null;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sideLength = windowHeight / 4; // 设置大圆的直径为窗口高度的四分之一
  angleMode(RADIANS); // 将角度模式更改为弧度
  genRandomColors(); // 生成随机色值
}

function draw() {
  // 绘制磁场流线图
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
  drawConcentricCircles(); // 绘制修改后的同心圆
  let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 95;
  // 设置透明度为weight
  stroke(250, 250, 250, 230)
  strokeWeight(10)
  // 绘制圆圈
  ellipse(mouseX, mouseY, 30, 30, 100)
  // 绘制轨迹, 
  line(mouseX, mouseY, pmouseX, pmouseY);

}


