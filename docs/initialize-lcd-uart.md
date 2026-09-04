# initialize the LCD screen

Initializes the DFRobot color LCD serial link at 9600 baud using the fixed microSySTEM-AI Vision wiring. The UART lines are crossed: controller P1 (TX) to display R, and controller P0 (RX) to display T.

```sig
a4MicroSystemAiVision.initLcd()
```

No pin selection is required. Set the display selector to UART/Serial mode before running the program.

## Example

```blocks
a4MicroSystemAiVision.initLcd()
lcdDisplay.lcdClearAll()
lcdDisplay.lcdSetBgcolor(0xffffff)
lcdDisplay.lcdDisplayText(
    "AI VISION",
    1,
    75,
    100,
    lcdDisplay.FontSize.Large,
    0x000000
)
```

```package
a4-microsystem-ai-vision=github:A4-TECHNOLOGIE/microSySTEM-AI-Vision
```
