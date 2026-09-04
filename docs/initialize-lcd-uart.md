# initialize the LCD over UART

Initializes the DFRobot color LCD serial link at 9600 baud. The UART lines must be crossed: controller TX to display R, and controller RX to display T.

```sig
a4MicroSystemAiVision.initLcdUart(SerialPin.P1, SerialPin.P0)
```

## Parameters

- **tx**: controller transmit pin connected to display R.
- **rx**: controller receive pin connected to display T.

The default microSySTEM-AI Vision wiring uses P1 for TX and P0 for RX. Set the display selector to UART/Serial mode before running the program.

## Example

```blocks
a4MicroSystemAiVision.initLcdUart(SerialPin.P1, SerialPin.P0)
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
