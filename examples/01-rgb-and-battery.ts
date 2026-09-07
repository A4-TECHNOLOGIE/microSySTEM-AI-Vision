// Display the DFR1216 battery level and check the two onboard RGB LEDs.

basic.showNumber(a4MicroSystemAiVision.batteryLevel())

a4MicroSystemAiVision.setDualRgbColors(
    A4VisionRgbColor.Red,
    A4VisionRgbColor.Green
)
basic.pause(1000)

a4MicroSystemAiVision.setRgbBrightness(64)
basic.pause(1000)

a4MicroSystemAiVision.clearRgb()
