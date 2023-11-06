# 9103-FINAL-xihu0325
![002](9103-01.png)
Static presentation of the final effect of the project


## 1.1 Introduction

In the complex tapestry of time and space, each individual is unique and independent. Although we may appear similar, our experiences are vastly different. In the same span of years, some may only taste the bitterness of life, while others savor its sweetness. Some struggle to survive and persevere, while others strive to break free from the constraints of the world. Despite the seemingly calm lives of most, beneath the surface, each person's destiny is like hidden undercurrents in the sea, always stirring different highs and lows. Under the tranquil facade, what is actually submerged is a life filled with tumultuous waves.

This design is a reinterpretation of Parsita Abad's work "Wheel of Fate." The color scheme is based on the Earth's blue, green, and white, emphasizing that while we all inhabit this same planet, each person's life story is unique. The design aims to provoke deep reflection and prompt individuals to seek the connection between their own lives and those of others.

In terms of shape, the design combines eyes with planets. Eyes are often regarded as the windows to emotions and inner worlds, the seat of the soul, and the gateway to the mind. By combining the shape of eyes with planets, the design implies the connection between each person's inner world and the universe.

The design retains the basic graphic elements and tone of "Wheel of Fate," seeking to use simple shapes to represent the different colors in each person's life. At the same time, it undertakes a secondary creation to delve deeper into the theme, aiming to trigger deep thought and emotional resonance. Choosing to view different Wheels of Fate, intends to stimulate contemplation of the resonance and connection between individuals and their own lives.


## 1.2 How To USE
**PS**：In ancient China, people believed that everyone's destiny was predetermined. Even though life paths may seem similar, they were actually quite different. It's similar to the stars in the sky—while they may appear the same, a closer look reveals that each star is a unique individual, diligently following its own trajectory.Click to view different ，**Let's together search for our own Wheels of Destiny.**。

- Follow the path ：                      `Move your mouse`
- Zoom in and read the Wheel of Destiny.：`Mouse click the circle`
- Change colors：                         `Refresh the page`



## 2.1 Iteration Process Record Table

| Iteration      | Address   |  Modify and add  |
| :--------  | :-----  | :----:  |
| Iteration1|https://github.com/xihu0325/9103-FINAL-xihu0325/blob/cdc167aca8595ebf6f941672a3d685a473ab02f0/9103%20final/sketch-1.js |Change colors, edit settings within the circles, and remove unnecessary code.|
| Iteration2 | https://github.com/xihu0325/9103-FINAL-xihu0325/blob/cdc167aca8595ebf6f941672a3d685a473ab02f0/9103%20final/sketch-2.js|Add Perlin noise effects, edit the background, apply Perlin noise effects within the circles, modify the color scheme, and adjust the data.|
| Iteration Final | https://github.com/xihu0325/9103-FINAL-xihu0325/blob/cdc167aca8595ebf6f941672a3d685a473ab02f0/9103%20final/sketch-final.js |Add mouse interaction, click to zoom in on the gears, track the mouse's path, and introduce elements into the scene to create as many possibilities as possible.|



## 2.2 Flow Chart

![003](Initialization.png)
```mermaid
graph LR
A[设置] --> B[生成随机颜色]
A --> C[获取对比颜色]
A --> D[绘制椭圆]
A --> E[绘制波浪圆]
A --> F[绘制点圆环]
A --> G[绘制小椭圆和线]
A --> H[绘制渐变半弧]
A --> I[绘制同心圆]

B --> D
B --> E
C --> D
C --> E
D --> I
E --> I
F --> I
G --> I
H --> I

I --> J[检测鼠标按下事件]
J --> K[检查鼠标位置]
K --> I
J --> L[鼠标释放事件]
L --> M[重置选中大圆]

style A fill:#85FFA5, stroke:#444
style B fill:#85FFA5, stroke:#444
style C fill:#85FFA5, stroke:#444
style D fill:#85FFA5, stroke:#444
style E fill:#85FFA5, stroke:#444
style F fill:#85FFA5, stroke:#444
style G fill:#85FFA5, stroke:#444
style H fill:#85FFA5, stroke:#444
style I fill:#85FFA5, stroke:#444
style J fill:#85FFA5, stroke:#444
style K fill:#85FFA5, stroke:#444
style L fill:#85FFA5, stroke:#444
style M fill:#85FFA5, stroke:#444

```

## 3.1 Project Editing Timeline (Timeline of Project Edits)

```mermaid
gantt
  title Project Development Process
  section The Group's Project
    Analysis of the Artwork:a1,2023-10-10,5d    
    Artistic Creation Extension:a2, 2023-10-13,5d
    Concept Validation, Group Project Output: a3,after a2,5d
  section Personal Project
    Planning the Code in the Group's Project  :a4,after a3,1d
    Secondary Design Concept  :a5,after a4,1d
    Coding: a6,after a5,4d
    Testing: a7,after a6,3d
  section Release Acceptance
    Release: a8,after a7,2d
    Acceptance: a8,after a7,3d
```

