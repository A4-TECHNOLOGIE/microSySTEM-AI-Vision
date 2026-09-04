# Testing and validation

This document defines the compilation and hardware acceptance tests for the **a4 microSySTEM-AI Vision** MakeCode extension and its UART LCD dependency.

## Automated compilation test

The root `test.ts` file references:

- every function in the `a4MicroSystemAiVision` public API;
- the legacy `a4_ai_vision` compatibility aliases;
- the HuskyLens 2 self-learning classification API;
- the LCD text display and widget deletion API used by the AI Vision activities.

The diagnostic functions are intentionally not called so the MakeCode simulator does not attempt to communicate with unavailable I2C or UART hardware.

The automated test passes when:

- the extension project compiles without TypeScript errors;
- every referenced symbol remains available;
- the simulator starts without a hardware-related exception;
- all files listed in `pxt.json` exist and all localization JSON files are valid.

Any compilation error, missing symbol, invalid package file or simulator exception is a failure.

## Required hardware

- one assembled microSySTEM-AI Vision model;
- one BBC micro:bit;
- one HuskyLens 2 camera;
- one compatible DFRobot color LCD set to UART/Serial mode;
- a charged battery or suitable USB power supply;
- four visually distinct test objects for classification.

## Test 1 - battery and RGB LEDs

1. Read the battery level and display it on the micro:bit.
2. Set RGB0 to red and RGB1 to green.
3. Set both LEDs successively to blue, white and off.
4. Repeat at brightness values 255, 64 and 0.

**Pass:** the battery value is between 0 and 100, the two selected colors match the commands, brightness decreases visibly, and both LEDs turn off.

**Fail:** the controller does not answer, the value is outside the expected range, one LED changes the state of the other, or a color/brightness command is incorrect.

## Test 2 - UART LCD initialization

1. Connect micro:bit P1 (TX) to display R and P0 (RX) to display T.
2. Set the LCD selector to UART/Serial mode.
3. Initialize the display once at 9600 baud.
4. Clear the display, select a white background and show black text.

**Pass:** the display clears and the expected text appears once, with the correct background and text colors.

**Fail:** the screen remains unchanged, contains corrupted data, or initialization must be repeated in the loop to obtain an image.

## Test 3 - LCD text deletion regression

1. Display `FRUIT` as text object 3.
2. Display `ID : 1` as text object 4.
3. Wait one second.
4. Delete text objects 3 and 4 with `lcdDeleteWidget`.
5. Do not clear the complete screen and do not overwrite the objects with spaces.

**Pass:** both text objects disappear while the background and any other widgets remain unchanged.

**Fail:** either text remains visible, another widget is deleted, or the whole screen must be cleared.

## Test 4 - HuskyLens 2 classification

1. Select self-learning classification in HuskyLens 2.
2. Learn four visually distinct objects as IDs 1, 2, 3 and 4.
3. Present each learned object separately to the camera.
4. Remove all learned objects from the field of view.

**Pass:** the MakeCode program receives the correct ID for each object and reports no available classification after the objects are removed.

**Fail:** an ID is missing or swapped, the last ID remains permanently available after the object is removed, or I2C communication is lost.

## Test 5 - legacy project compatibility

Open a development project that uses calls such as:

```typescript
a4_ai_vision.clearRgb()
a4_ai_vision.initLcdUart(SerialPin.P1, SerialPin.P0)
```

**Pass:** the project compiles and behaves as before. New blocks inserted from the toolbox generate calls to `a4MicroSystemAiVision`.

**Fail:** an old symbol is missing or two copies of the a4 AI Vision block category appear.

## Release acceptance record

Before creating a public GitHub release, record the date, micro:bit version, LCD version, HuskyLens 2 firmware version and result of each hardware test.

| Test | Result | Notes |
|---|---|---|
| Battery and RGB LEDs | Not run | Requires the physical model |
| UART LCD initialization | Not run | Requires the physical model |
| LCD text deletion | Not run | Requires the physical model |
| HuskyLens 2 classification | Not run | Requires the physical model and four learned objects |
| Legacy project compatibility | Not run | Requires an existing development project |
