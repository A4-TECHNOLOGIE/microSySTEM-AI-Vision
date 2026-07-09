// Basic compile test for the microSySTEM AI Vision extension.

// DFR1216 helper blocks
a4_ai_vision.setDualRgbColors(A4VisionRgbColor.Red, A4VisionRgbColor.Green)
a4_ai_vision.setRgbBrightness(64)
a4_ai_vision.clearRgb()

// Battery helper block
basic.showNumber(a4_ai_vision.batteryLevel())

// LCD UART dependency helper block
a4_ai_vision.initLcdUart(SerialPin.P1, SerialPin.P0)
lcdDisplay.lcdClearAll()
lcdDisplay.lcdSetBgcolor(0x7f00ff)
lcdDisplay.lcdDisplayText("AI Vision", 1, 10, 10, lcdDisplay.FontSize.Small, 0xffffff)
