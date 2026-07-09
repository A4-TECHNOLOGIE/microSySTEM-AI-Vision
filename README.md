# microSySTEM-AI-Vision

MakeCode extension for the A4 microSySTEM AI Vision mock-up.

This package adds a small A4 menu named **a4 AI Vision** and automatically loads the external extensions used by the mock-up:

- **HUSKYLENS 2**: `github:DFRobot/pxt-DFRobot_HuskyLensV2`
- **LCD Display with UART support**: `github:A4-TECHNOLOGIE/pxt-DFRobot_lcdDisplay_uart`

The LCD dependency is based on the DFRobot LCD Display MakeCode extension. The A4 fork keeps the `lcdDisplay` namespace and adds UART/Serial support required by the microSySTEM AI Vision wiring.

## Blocks provided by a4 AI Vision

### System

- `battery level (%)`

Returns the DFR1216 battery level in percent.

### RGB LEDs

- `set RGB0 to ... and RGB1 to ...`
- `set RGB0 R ... G ... B ... RGB1 R ... G ... B ...`
- `set RGB brightness ...`
- `turn off RGB LEDs`

The two DFR1216 RGB LEDs are written at the same time so changing one LED does not erase the previous state of the other LED.

### LCD

- `initialize LCD UART TX ... RX ...`

Initializes the LCD display serial link at **9600 baud** and switches the `lcdDisplay` dependency to UART mode.

UART wiring must be crossed:

- display **R** to controller **TX**
- display **T** to controller **RX**

Default wiring for the microSySTEM AI Vision mock-up:

- controller **TX P1** to display **R**
- controller **RX P0** to display **T**

Set the display DIP switch to **UART / Serial** mode before using UART.

## Basic usage

```typescript
// Initialize once, for example in "on start".
a4_ai_vision.initLcdUart(SerialPin.P1, SerialPin.P0)
lcdDisplay.lcdClearAll()
lcdDisplay.lcdSetBgcolor(0x7f00ff)
```

Avoid placing the LCD initialization inside a `forever` loop.

## Notes

The A4 extension only contains the A4-specific helper blocks. Camera and display blocks remain available in their own MakeCode menus through the dependencies declared in `pxt.json`.

## License

MIT

```package
microSySTEM-AI-Vision=github:A4-TECHNOLOGIE/microSySTEM-AI-Vision
```
