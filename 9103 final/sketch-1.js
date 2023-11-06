let sideLength = 200; // 大圆的直径
let gap = 10; // 大圆之间的间隔
let rows = 5; // 行数
let cols = 5; // 列数
let rotationSpeed = 0.01; // 自旋速度
let smallEllipseDiameter = 14; // 小椭圆的直径
let smallEllipseCount = 12; // 每个大圆的小椭圆数量
let smallEllipseDistance = 20; // 小椭圆距离大圆的距离
let concentricCircles = 4; // 同心圆的数量
let concentricCircleColors = []; // 同心圆的颜色
let dottedCircles = 3; // 每层同心圆虚线环的数量


//生成随机色值，三维数组
function genRundomColors() {
    // 生成随机的同心圆颜色值
    for (let i = 0; i < rows; i++) {
        concentricCircleColors.push([]); // 初始化二维数组
        for (let j = 0; j < cols; j++) {
            concentricCircleColors[i].push([]);
            for (let k = 0; k < concentricCircles; k++) {
                concentricCircleColors[i][j].push(color(random(255), random(255), random(255)));
            }
        }
    }
}
//获取对比色
function getContrastColor(hexColor) {
    let c = color(hexColor); // 创建颜色
    let r = red(c); // 获取红色分量
    let g = green(c); // 获取绿色分量
    let b = blue(c); // 获取蓝色分量
    let contrastR = 255 - r;
    let contrastG = 255 - g;
    let contrastB = 255 - b;
    return color(contrastR, contrastG, contrastB);
}
//绘制波浪形状的圆
function drawWaveCircle(i, j, k, radius) {
    push();
    rotate(frameCount / (50.0 / (j + 50))); // 根据圆的索引改变旋转速度
    // 绘制波浪形状的圆
    beginShape();
    noFill();
    stroke(getContrastColor(concentricCircleColors[i][j][k])); // 设置描边颜色
    strokeWeight(1); // 设置描边宽度
    for (let angle = 0; angle < 360; angle += 0.5) {
        let r = radius * 0.85 + 12 * sin(80 * angle); // 使用度来计算sin函数
        let x = r * cos(angle);
        let y = r * sin(angle);
        vertex(x, y);
    }
    endShape(CLOSE);
    beginShape();
    // strokeWeight(1); // 设置描边宽度
    for (let angle = 0; angle < 360; angle += 0.5) {
        let r = 38 + 8 * sin(60 * angle); // 使用度来计算sin函数
        let x = r * cos(angle);
        let y = r * sin(angle);
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();
}
//绘制虚线环
function drawDottedCircle(i, j, k, radius) {
    for (let n = 0; n < dottedCircles && k < concentricCircles - 1; n++) {
        push();
        rotate(frameCount / (50.0 / (k + 50))); // 根据圆的索引改变旋转速度
        stroke(getContrastColor(concentricCircleColors[i][j][k])); // 设置描边颜色
        strokeWeight(8 - k); // 设置描边宽度
        noFill(); // 不填充
        // 设置虚线样式，根据圆的索引改变虚线的间隔
        drawingContext.setLineDash([5, 10 + k]);
        ellipse(0, 0, radius * 2 - 10 - 20 * n); // 绘制同心圆，根据圆的索引改变半径
        pop();
        drawingContext.setLineDash([]); // 重置虚线样式
    }
}
//绘制小椭圆和连线
function drawSmallEllipses() {
    let smallEllipses = [];
    for (let k = 0; k < smallEllipseCount; k++) {
        let angle = map(k, 0, smallEllipseCount, 0, 360);
        let x = (sideLength / 2 + smallEllipseDistance) * cos(angle + smallEllipseDistance);
        let y = (sideLength / 2 + smallEllipseDistance) * sin(angle + smallEllipseDistance * 1.5);
        smallEllipses.push({ x, y });
    }
    // 绘制小椭圆之间曲线
    stroke('#E8670D');
    strokeWeight(3);
    noFill();
    beginShape();
    drawingContext.setLineDash([3, 4]);
    for (let l = 0; l < smallEllipseCount; l++) {
        curveVertex(smallEllipses[l].x, smallEllipses[l].y);
    }
    endShape(CLOSE);
    // 绘制小椭圆
    for (let l = 0; l < smallEllipseCount; l++) {
        let ellipseRadius = smallEllipseDiameter / 2; // 小椭圆的半径
        // 绘制渐变小椭圆
        for (let i = 0; i <= ellipseRadius; i++) {
            let t = map(i, 0, ellipseRadius, 0, 1); // 将半径映射到0和1之间
            let gradientColor = lerpColor(color(255), color(0), t); // 获取插值颜色
            fill(gradientColor); // 设置填充颜色为插值颜色
            noStroke(); // 不描边
            ellipse(smallEllipses[l].x, smallEllipses[l].y, smallEllipseDiameter - i, smallEllipseDiameter - i); // 绘制一个小椭圆
        }
    }
}
//绘制渐变半弧线，会旋转
function drawGradientArc(i, j) {
    if (!(i % 2 === 0 && j % 2 !== 0) && !(i % 2 !== 0 && j % 2 === 0)) {
        rotate(frameCount / (50.0 / (i + 50))); // 根据圆的索引改变旋转速度
        rotate(30 * (i + j)); // 让每个弧线的朝向不同
        let arcStartAngle = 180; // 弧线的开始角度
        let arcEndAngle = 225 + 20 * (i + j); // 弧线的结束角度
        for (let i = arcStartAngle; i <= arcEndAngle; i++) {
            let t = map(i, arcStartAngle, arcEndAngle, 0, 1); // 将角度映射到0和1之间
            let gradientColor = lerpColor(color(0, 255, 0), color(255, 0, 0), t); // 获取插值颜色
            stroke(gradientColor); // 设置描边颜色为插值颜色
            strokeWeight(5); // 设置描边宽度
            noFill(); // 不填充
            arc(sideLength / 4, 0, sideLength / 2, sideLength, i, i + 1); // 绘制一个小段的弧线
        }
    }
}
//绘制连接两个大圆圆心的渐变半弧线
function drawGradientArc2() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            push();
            translate((j + 0.5 * (i % 2)) * (sideLength + gap * 4), i * (sideLength + gap) + sideLength / 2); // 将原点移动到每个大圆的中心
            if (!(i % 2 === 0 && j % 2 !== 0) && !(i % 2 !== 0 && j % 2 === 0)) {
                let arcStartAngle = 180; // 弧线的开始角度
                let arcEndAngle = 360; // 弧线的结束角度
                for (let i = arcStartAngle; i <= arcEndAngle; i++) {
                    let t = map(i, arcStartAngle, arcEndAngle, 0, 1); // 将角度映射到0和1之间
                    let gradientColor = lerpColor(color(0, 255, 0), color(255, 0, 0), t); // 获取插值颜色
                    stroke(gradientColor); // 设置描边颜色为插值颜色
                    strokeWeight(5); // 设置描边宽度
                    noFill(); // 不填充
                    arc(sideLength - gap * 8, 0, sideLength + gap * 4, sideLength * 1, i, i + 1); // 绘制一个小段的弧线
                }
            }
            pop();
        }
    }
}
//绘制大圆
function drawConcentricCircles() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            push();
            translate((j + 0.5 * (i % 2)) * (sideLength + gap * 4), i * (sideLength + gap) + sideLength / 2); // 将原点移动到每个大圆的中心
            rotate(frameCount * rotationSpeed); // 使每个大圆自旋
            // 绘制同心圆
            for (let k = 0; k < concentricCircles; k++) {
                let radius = sideLength / 2 - k * (sideLength / (1.6 * concentricCircles));
                fill(concentricCircleColors[i][j][k]); // 设置填充颜色为随机色
                noStroke(); // 不描边
                ellipse(0, 0, radius * 2, radius * 2); // 绘制同心圆
                if (i % 2 === 0 && j % 2 !== 0) {
                    drawWaveCircle(i, j, k, radius);
                } else {
                    drawDottedCircle(i, j, k, radius);
                }
            }
            drawSmallEllipses();
            // 放开此处后，半弧线会随着旋转而旋转，不会连接两个大圆的圆心
            // drawGradientArc(i, j);
            pop();
        }
    }
    drawGradientArc2();
}

function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES); // 将角度模式更改为度数
    genRundomColors(); // 生成随机色值
}

function draw() {
    background(102);
    drawConcentricCircles();
}

