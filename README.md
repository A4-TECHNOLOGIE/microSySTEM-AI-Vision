# microSySTEM-AI-Vision

MakeCode extension for the A4 microSySTEM AI Vision mock-up.

This package adds a small A4 menu named **a4 AI Vision** and automatically loads the external extensions used by the mock-up:

- **HUSKYLENS 2**: `github:DFRobot/pxt-DFRobot_HuskyLensV2`
- **DFRobot LCD display**: `github:DFRobot/pxt-DFRobot_lcdDisplay`

## Blocks provided by a4 AI Vision

### System

- `battery level (%)`

Returns the DFR1216 battery level in percent.

### RGB LEDs

- `set RGB0 to ... and RGB1 to ...`
- `set RGB0 R ... G ... B ... and RGB1 R ... G ... B ...`
- `set RGB brightness ...`
- `turn off RGB LEDs`

The two DFR1216 RGB LEDs are written at the same time so changing one LED does not erase the previous state of the other LED.

### LCD

- `initialize LCD UART TX ... RX ...`

Initializes the display serial link at **9600 baud**.

UART wiring must be crossed:

- display **R** to controller **TX**
- display **T** to controller **RX**

Set the display DIP switch to **UART / Serial** mode before using UART.

## Notes

The A4 extension only contains the A4-specific helper blocks. Camera and display blocks remain available in their own MakeCode menus through the dependencies declared in `pxt.json`.
